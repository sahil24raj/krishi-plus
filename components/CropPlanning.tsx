import React, { useState } from 'react';
import { getCropPlan } from '../services/geminiService';
import type { CropPlan } from '../types';

const CalculatorIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 14h.01M12 17h.01M15 17h.01M9 10h.01M12 10h.01M15 10h.01M4 7h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1z" /></svg>;

const CropPlanning = () => {
    const [crop, setCrop] = useState('');
    const [area, setArea] = useState('');
    const [plan, setPlan] = useState<CropPlan | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!crop || !area) {
            setError("Please fill in both crop name and land area.");
            return;
        }
        setLoading(true);
        setError(null);
        setPlan(null);

        try {
            const result = await getCropPlan(crop, area);
            setPlan(result);
        } catch (err: any) {
            setError(err.message || "An error occurred while generating the plan.");
        } finally {
            setLoading(false);
        }
    };
    
    const renderPlan = () => {
        if (!plan) return null;

        return (
            <div className="mt-8 bg-slate-800 p-6 rounded-lg shadow-inner space-y-6">
                <h2 className="text-2xl font-bold text-center text-primary">Your Plan for {plan.crop} on {plan.area}</h2>
                
                {/* Requirements Section */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 text-slate-100 border-b-2 border-primary pb-1">Estimated Requirements</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(plan.requirements).map(([key, value]) => (
                            <div key={key} className="bg-slate-700 p-4 rounded-md shadow-sm">
                                <p className="font-semibold capitalize text-slate-300">{key}:</p>
                                <p className="text-slate-100">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timeline Section */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 text-slate-100 border-b-2 border-primary pb-1">Cultivation Timeline</h3>
                    <div className="space-y-4">
                        {plan.timeline.map((item, index) => (
                            <div key={index} className="flex items-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4">{index + 1}</div>
                                <div>
                                    <p className="font-bold text-slate-100">{item.stage}</p>
                                    <p className="text-slate-300">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary">AI Crop Planner</h1>
                <p className="mt-2 text-lg text-text-secondary">Get a customized cultivation plan in seconds.</p>
            </div>
            <div className="max-w-3xl mx-auto bg-slate-900 text-slate-200 p-8 rounded-xl shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="crop" className="block text-sm font-medium text-slate-300">Crop Name</label>
                        <input
                            type="text"
                            id="crop"
                            value={crop}
                            onChange={(e) => setCrop(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm bg-slate-800 text-slate-200 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm placeholder-slate-400"
                            placeholder="e.g., Tomato, Wheat, Cotton"
                        />
                    </div>
                    <div>
                        <label htmlFor="area" className="block text-sm font-medium text-slate-300">Area of Land</label>
                        <input
                            type="text"
                            id="area"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm bg-slate-800 text-slate-200 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm placeholder-slate-400"
                            placeholder="e.g., 2 Acres, 5 Hectares"
                        />
                    </div>
                    <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark disabled:bg-gray-400">
                        {loading ? 'Generating Plan...' : <><CalculatorIcon /> Calculate Plan</>}
                    </button>
                </form>

                {error && <p className="mt-4 text-center text-red-400 bg-red-900 bg-opacity-50 p-3 rounded-md">{error}</p>}
                {renderPlan()}
            </div>
        </div>
    );
};

export default CropPlanning;