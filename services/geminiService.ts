import { GoogleGenAI, Type } from "@google/genai";
import type { CropPlan, DetectionResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = (file: File) => {
  return new Promise<{ inlineData: { data: string; mimeType: string } }>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result !== 'string') {
        return reject(new Error("Failed to read file as base64 string."));
      }
      const base64Data = reader.result.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};


export const detectCropIssue = async (imageFile: File): Promise<DetectionResult> => {
  const imagePart = await fileToGenerativePart(imageFile);
  
  const prompt = `Analyze this image of a crop. Identify any diseases, pests, or nutrient deficiencies.
Provide a detailed description of the problem, its potential causes, and recommend both organic and chemical treatment solutions.
Also provide 2-3 immediate, simple, and actionable recommendations a farmer can take right away.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [imagePart, { text: prompt }] },
    config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                problem: { type: Type.STRING },
                causes: { type: Type.STRING },
                solutions: {
                    type: Type.OBJECT,
                    properties: {
                        organic: { type: Type.ARRAY, items: { type: Type.STRING } },
                        chemical: { type: Type.ARRAY, items: { type: Type.STRING } },
                    },
                    required: ['organic', 'chemical'],
                },
                initialRecommendations: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "2-3 immediate, simple, and actionable recommendations."
                }
            },
            required: ['problem', 'causes', 'solutions', 'initialRecommendations'],
        }
    }
  });

  try {
    const jsonString = response.text;
    return JSON.parse(jsonString) as DetectionResult;
  } catch (error) {
    console.error("Error parsing Gemini JSON response:", error);
    throw new Error("Failed to get a valid analysis from the AI. The response was not valid JSON.");
  }
};

export const getCropPlan = async (crop: string, area: string): Promise<CropPlan> => {
  const prompt = `Given that a farmer wants to grow ${crop} on ${area} of land, provide a detailed plan.
The plan should include the estimated required amount of seeds, fertilizer (specify types like NPK), pesticides, and an estimate of the water needed.
Also, provide a rough timeline for key stages like sowing, irrigation, and harvesting.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          crop: { type: Type.STRING },
          area: { type: Type.STRING },
          requirements: {
            type: Type.OBJECT,
            properties: {
              seeds: { type: Type.STRING, description: 'e.g., "10-12 kg"' },
              fertilizer: { type: Type.STRING, description: 'e.g., "50kg NPK (12:32:16), 25kg Urea"' },
              pesticides: { type: Type.STRING, description: 'e.g., "As needed, recommend specific types"' },
              water: { type: Type.STRING, description: 'e.g., "Approx. 4000-6000 cubic meters"' },
            },
            required: ['seeds', 'fertilizer', 'pesticides', 'water'],
          },
          timeline: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                stage: { type: Type.STRING },
                description: { type: Type.STRING },
              },
              required: ['stage', 'description'],
            },
          },
        },
        required: ['crop', 'area', 'requirements', 'timeline'],
      },
    },
  });

  try {
    const jsonString = response.text;
    return JSON.parse(jsonString) as CropPlan;
  } catch (error) {
    console.error("Error parsing Gemini JSON response for crop plan:", error);
    throw new Error("Failed to get a valid crop plan from the AI. The response was not valid JSON.");
  }
};
