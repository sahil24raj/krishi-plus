import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description, link }: { icon: React.ReactNode, title: string, description: string, link: string }) => (
    <div className="bg-surface p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-primary mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-text-primary">{title}</h3>
        <p className="text-text-secondary mb-4">{description}</p>
        <Link to={link} className="font-semibold text-primary hover:text-primary-dark transition-colors">
            Learn More &rarr;
        </Link>
    </div>
);

const Home = () => {
    const features = [
        {
            icon: <BookOpenIcon />,
            title: "Agri Learn",
            description: "Access video lectures and step-by-step guides to master modern farming techniques.",
            link: "/agri-learn"
        },
        {
            icon: <CameraIcon />,
            title: "AI Detector",
            description: "Instantly detect crop diseases and pests by simply scanning them with your phone's camera.",
            link: "/ai-detector"
        },
        {
            icon: <BellIcon />,
            title: "AI Alert",
            description: "Receive timely weather forecasts and pest outbreak alerts to protect your crops proactively.",
            link: "/ai-alert"
        },
        {
            icon: <UsersIcon />,
            title: "Krishi Parivaar",
            description: "Join a community of fellow farmers. Share knowledge, ask questions, and grow together.",
            link: "/krishi-parivaar"
        },
        {
            icon: <CalculatorIcon />,
            title: "Crop Planning",
            description: "Calculate the exact amount of seeds, fertilizer, and water needed for your farm size.",
            link: "/crop-planning"
        },
        {
            icon: <ShoppingCartIcon />,
            title: "Apni Dukaan",
            description: "Sell your produce directly to buyers at fair prices through our digital marketplace.",
            link: "/apni-dukaan"
        }
    ];

    return (
        <div className="space-y-12">
            <section className="text-center bg-green-50 p-12 rounded-lg">
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark">Welcome to KRISHI+</h1>
                <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">
                    Your trusted partner in modern agriculture. We bring cutting-edge AI technology to your fingertips, helping you increase yield and profitability.
                </p>
                <Link
                    to="/ai-detector"
                    className="mt-8 inline-block bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-dark transition-transform transform hover:scale-105"
                >
                    Detect Crop Disease Now
                </Link>
            </section>

            <section>
                <h2 className="text-3xl font-bold text-center mb-8 text-text-primary">Our Features</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* FIX: Pass props explicitly to avoid TypeScript error with spread operator and key prop */}
                    {features.map(feature => <FeatureCard key={feature.title} icon={feature.icon} title={feature.title} description={feature.description} link={feature.link} />)}
                </div>
            </section>
        </div>
    );
};

// SVG Icons as separate components
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-3-5.197M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const CalculatorIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 14h.01M12 17h.01M15 17h.01M9 10h.01M12 10h.01M15 10h.01M4 7h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1z" /></svg>;
const ShoppingCartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;

export default Home;