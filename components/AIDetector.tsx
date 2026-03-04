import React, { useState, useRef, useCallback } from 'react';
import { detectCropIssue } from '../services/geminiService';
import type { DetectionResult } from '../types';

const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 16l-4 4-4-4 5.293-5.293a1 1 0 011.414 0z" /></svg>;
const LightbulbIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>

const AIDetector = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [result, setResult] = useState<DetectionResult | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [useCamera, setUseCamera] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target?.result as string);
                setImageFile(file);
                setUseCamera(false);
                stopCamera();
            };
            reader.readAsDataURL(file);
        }
    };

    const startCamera = useCallback(async () => {
        setUseCamera(true);
        setImageSrc(null);
        setResult(null);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing camera: ", err);
                setError("Could not access the camera. Please check permissions.");
                setUseCamera(false);
            }
        }
    }, []);

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d')?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            const dataUrl = canvas.toDataURL('image/jpeg');
            setImageSrc(dataUrl);
            canvas.toBlob(blob => {
                if (blob) {
                    setImageFile(new File([blob], "capture.jpg", { type: "image/jpeg" }));
                }
            }, 'image/jpeg');
            setUseCamera(false);
            stopCamera();
        }
    };
    
    const handleSubmit = async () => {
        if (!imageFile) {
            setError("Please select an image or capture one first.");
            return;
        }
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const detectionResult = await detectCropIssue(imageFile);
            setResult(detectionResult);
        } catch (err: any) {
            setError(err.message || "An error occurred during detection.");
        } finally {
            setLoading(false);
        }
    };

    const renderResult = () => {
        if (!result) return null;
        return (
            <div className="space-y-6 mt-6 p-6 bg-green-50 rounded-lg">
                <div>
                    <h3 className="text-xl font-bold text-red-600 mb-2">Problem Detected:</h3>
                    <p className="text-text-primary text-lg">{result.problem}</p>
                </div>
                
                {result.initialRecommendations && result.initialRecommendations.length > 0 && (
                     <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                        <h3 className="text-xl font-bold text-blue-800 mb-2 flex items-center">
                            <LightbulbIcon />
                            Immediate Recommendations
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-blue-900">
                            {result.initialRecommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                        </ul>
                    </div>
                )}

                <div>
                    <h3 className="text-xl font-bold text-yellow-600 mb-2">Potential Causes:</h3>
                    <p className="text-text-secondary">{result.causes}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-bold text-green-600 mb-2">Organic Solutions:</h3>
                        <ul className="list-disc list-inside space-y-1 text-text-secondary">
                            {result.solutions.organic.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-blue-600 mb-2">Chemical Solutions:</h3>
                        <ul className="list-disc list-inside space-y-1 text-text-secondary">
                            {result.solutions.chemical.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary">AI Crop Disease Detector</h1>
                <p className="mt-2 text-lg text-text-secondary">Upload a photo or use your camera to identify crop issues.</p>
            </div>
            <div className="max-w-4xl mx-auto bg-surface p-8 rounded-xl shadow-lg">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center aspect-square flex flex-col justify-center items-center">
                            {imageSrc && !useCamera && <img src={imageSrc} alt="Crop preview" className="max-h-full max-w-full object-contain rounded-md" />}
                            {useCamera && <video ref={videoRef} autoPlay playsInline className="w-full h-full object-contain rounded-md"></video>}
                            {!imageSrc && !useCamera && (
                                <div className="text-text-secondary">
                                    <CameraIcon />
                                    <p>Image preview will appear here</p>
                                </div>
                            )}
                        </div>
                        <canvas ref={canvasRef} className="hidden"></canvas>
                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                            <label className="flex-1 cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-dark">
                                <UploadIcon />
                                Upload Image
                                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                            </label>
                            <button onClick={useCamera ? captureImage : startCamera} className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <CameraIcon />
                                {useCamera ? 'Capture' : 'Use Camera'}
                            </button>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-text-primary">Analysis Result</h2>
                        <button onClick={handleSubmit} disabled={loading || !imageFile} className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed">
                            {loading ? (
                                <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Analyzing...
                                </>
                            ) : (
                                <>
                                <SparklesIcon />
                                Detect Problem
                                </>
                            )}
                        </button>
                        {error && <p className="mt-4 text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
                        {loading && <p className="mt-4 text-center text-text-secondary">AI is analyzing your image. This may take a moment...</p>}
                        {result ? renderResult() : !loading && <p className="mt-4 text-center text-text-secondary">Results will be displayed here.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIDetector;
