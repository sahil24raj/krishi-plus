export interface CropPlan {
  crop: string;
  area: string;
  requirements: {
    seeds: string;
    fertilizer: string;
    pesticides: string;
    water: string;
  };
  timeline: {
    stage: string;
    description: string;
  }[];
}

export interface DetectionResult {
  problem: string;
  causes: string;
  solutions: {
    organic: string[];
    chemical: string[];
  };
  initialRecommendations: string[];
}
