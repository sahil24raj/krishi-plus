import React from 'react';

const AlertIcon = ({ level }: { level: 'warning' | 'danger' | 'info' }) => {
    const iconColor = {
        warning: 'text-yellow-500',
        danger: 'text-red-500',
        info: 'text-blue-500',
    };
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${iconColor[level]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    );
};


const AlertCard = ({ title, message, level, time }: { title: string, message: string, level: 'warning' | 'danger' | 'info', time: string }) => {
    const cardColor = {
        warning: 'bg-yellow-50 border-yellow-400',
        danger: 'bg-red-50 border-red-400',
        info: 'bg-blue-50 border-blue-400',
    };

    return (
        <div className={`p-4 rounded-lg border-l-4 ${cardColor[level]} shadow-sm`}>
            <div className="flex">
                <div className="flex-shrink-0">
                    <AlertIcon level={level} />
                </div>
                <div className="ml-3">
                    <p className="text-sm font-bold text-text-primary">{title}</p>
                    <p className="mt-1 text-sm text-text-secondary">{message}</p>
                    <p className="mt-2 text-xs text-gray-500">{time}</p>
                </div>
            </div>
        </div>
    );
};

const AIAlert = () => {
    const alerts = [
        {
            title: "Heavy Rain Warning",
            message: "Heavy rainfall (50-70mm) expected in the northern region in the next 48 hours. Secure equipment and check drainage.",
            level: "warning" as const,
            time: "2 hours ago"
        },
        {
            title: "Locust Swarm Alert",
            message: "A large locust swarm has been spotted 200km east of the central plains. High risk of crop damage. Take immediate preventive measures.",
            level: "danger" as const,
            time: "5 hours ago"
        },
        {
            title: "Favorable Weather Update",
            message: "Clear skies and moderate temperatures are expected for the next 5 days. Ideal conditions for sowing and irrigation.",
            level: "info" as const,
            time: "1 day ago"
        },
        {
            title: "Aphid Infestation Risk",
            message: "Weather conditions are favorable for aphid breeding. Monitor your vegetable crops closely for the next week.",
            level: "warning" as const,
            time: "2 days ago"
        },
    ];

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary">AI Alerts</h1>
                <p className="mt-2 text-lg text-text-secondary">Stay updated with the latest weather and pest alerts.</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
                {/* FIX: Pass props explicitly to avoid TypeScript error with spread operator and key prop */}
                {alerts.map((alert, index) => <AlertCard key={index} title={alert.title} message={alert.message} level={alert.level} time={alert.time} />)}
            </div>
        </div>
    );
};

export default AIAlert;