import React, { useState } from 'react';

// --- DUMMY DATA FOR TUTORIALS ---
const tutorialData = {
    "Modern Wheat Cultivation": {
        video: "n_f3-O8p_l4", // YouTube video ID
        activity: {
            title: "Wheat Planting Order",
            items: ["Plow Field", "Add Manure", "Sow Seeds", "First Irrigation"],
            dropZones: ["Step 1", "Step 2", "Step 3", "Step 4"]
        },
        quiz: [
            { question: "What is the ideal soil pH for wheat?", options: ["5.5-6.5", "6.0-7.0", "7.0-8.0"], answer: "6.0-7.0" },
            { question: "Which of these is a common wheat disease?", options: ["Rust", "Blight", "Wilt"], answer: "Rust" }
        ],
        scenario: {
            title: "Pest Attack!",
            description: "You notice aphids on your young wheat plants. What is your first action?",
            options: [
                { text: "Spray chemical pesticide immediately.", feedback: "This can be effective, but consider integrated pest management first to protect beneficial insects." },
                { text: "Introduce ladybugs, a natural predator.", feedback: "Excellent choice! This is a great organic pest control method." },
                { text: "Ignore it, they might go away.", feedback: "Not recommended. Aphids can multiply quickly and damage your crop yield significantly." }
            ]
        }
    },
    "Organic Vegetable Farming": {
        video: "2wF5_s_h-8s",
        activity: {
            title: "Tomato Planting",
            items: ["Prepare Soil with Compost", "Plant Seedling", "Water Thoroughly", "Add Mulch"],
            dropZones: ["Step 1", "Step 2", "Step 3", "Step 4"]
        },
        quiz: [
            { question: "What is the primary benefit of crop rotation?", options: ["Increased water retention", "Improved soil health and pest control", "Taller plants"], answer: "Improved soil health and pest control" },
            { question: "What is a common sign of nitrogen deficiency in tomatoes?", options: ["Purple leaves", "Yellowing of older, lower leaves", "White spots"], answer: "Yellowing of older, lower leaves" }
        ],
        scenario: {
            title: "Watering Woes",
            description: "Your region is facing a water shortage. How do you manage irrigation for your vegetable patch?",
            options: [
                { text: "Water daily for a short period.", feedback: "This can lead to shallow roots. It's better to water less frequently but more deeply." },
                { text: "Install a drip irrigation system.", feedback: "The most efficient choice! Drip irrigation minimizes water waste by delivering water directly to the roots." },
                { text: "Stop watering until it rains.", feedback: "This is very risky and can stress the plants, severely impacting your harvest." }
            ]
        }
    },
    "Pest Management Techniques": {
        video: "ag_4242yYd-Q",
        activity: {
            title: "Pest Identification",
            items: ["Aphids", "Spider Mites", "Whiteflies", "Caterpillars"],
            dropZones: ["Sucking Pest", "Web-spinning Pest", "Flying Pest", "Leaf-chewing Pest"]
        },
        quiz: [
            { question: "What is a common sign of spider mites?", options: ["Holes in leaves", "Fine webbing on plants", "Yellow spots"], answer: "Fine webbing on plants" },
            { question: "Which insect is a natural predator of aphids?", options: ["Ladybugs", "Grasshoppers", "Ants"], answer: "Ladybugs" }
        ],
        scenario: {
            title: "Fungus Gnats",
            description: "You notice small, dark flies around the soil of your potted seedlings. What do you do?",
            options: [
                { text: "Increase watering.", feedback: "This will make the problem worse, as fungus gnats thrive in moist soil." },
                { text: "Let the soil dry out between waterings.", feedback: "Correct! This is the most effective cultural control method for fungus gnats." },
                { text: "Spray the leaves with insecticide.", feedback: "Fungus gnat larvae live in the soil, so spraying the leaves won't be very effective." }
            ]
        }
    }
};

// --- ICONS ---
const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const PuzzleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>;
const QuestionMarkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const BranchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21v-5m0 0V3m0 13a2 2 0 100 4 2 2 0 000-4zm0-4a2 2 0 110-4 2 2 0 010 4zm0 0a2 2 0 100 4 2 2 0 000-4zm0-4a2 2 0 110-4 2 2 0 010 4z" /></svg>;


// --- INTERACTIVE TUTORIAL COMPONENTS ---

const VideoLecture = ({ videoId }: { videoId: string }) => (
    <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Video Lecture</h3>
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">Watch the video above to learn the fundamentals before proceeding to the interactive activities.</p>
    </div>
);


const PlantingActivity = ({ data }: { data: any }) => {
    const [droppedItems, setDroppedItems] = useState<{ [key: string]: string | null }>({});
    const [feedback, setFeedback] = useState<{ [key: string]: boolean | null }>({});

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: string) => {
        e.dataTransfer.setData("text/plain", item);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, zone: string, index: number) => {
        e.preventDefault();
        const item = e.dataTransfer.getData("text/plain");
        setDroppedItems(prev => ({ ...prev, [zone]: item }));
        
        const isCorrect = item === data.items[index];
        setFeedback(prev => ({ ...prev, [zone]: isCorrect }));
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-center text-primary-dark">{data.title}</h3>
            <p className="text-center text-text-secondary mb-6">Drag the items on the right to their correct category on the left.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Drop Zones */}
                <div className="space-y-4">
                    {data.dropZones.map((zone: string, index: number) => (
                        <div
                            key={zone}
                            onDrop={(e) => handleDrop(e, zone, index)}
                            onDragOver={handleDragOver}
                            className={`p-4 h-16 border-2 border-dashed rounded-lg flex items-center justify-center
                                ${feedback[zone] === true ? 'border-green-500 bg-green-100' : ''}
                                ${feedback[zone] === false ? 'border-red-500 bg-red-100' : 'border-gray-300'}
                            `}
                        >
                            <span className="font-semibold text-text-secondary mr-4">{zone}:</span>
                            {droppedItems[zone] ? (
                                <span className="font-bold text-text-primary">{droppedItems[zone]}</span>
                            ) : (
                                <span className="text-gray-400">Drop here</span>
                            )}
                        </div>
                    ))}
                </div>
                {/* Draggable Items */}
                <div className="space-y-4">
                    {data.items
                        .filter((item: string) => !Object.values(droppedItems).includes(item))
                        .map((item: string) => (
                        <div
                            key={item}
                            draggable
                            onDragStart={(e) => handleDragStart(e, item)}
                            className="p-4 bg-white rounded-lg shadow cursor-grab active:cursor-grabbing text-center font-semibold text-primary"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Quiz = ({ data }: { data: any[] }) => {
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [submitted, setSubmitted] = useState(false);

    const handleSelect = (qIndex: number, option: string) => {
        if(submitted) return;
        setAnswers(prev => ({ ...prev, [qIndex]: option }));
    };
    
    const getResultColor = (qIndex: number, option: string) => {
        if (!submitted) return 'hover:bg-primary-dark';
        const correctAnswer = data[qIndex].answer;
        if (option === correctAnswer) return 'bg-green-500';
        if (answers[qIndex] === option) return 'bg-red-500';
        return 'bg-gray-400';
    };

    return (
        <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-center text-blue-800">Knowledge Check</h3>
            <div className="space-y-6">
                {data.map((q, qIndex) => (
                    <div key={qIndex}>
                        <p className="font-semibold mb-2 text-text-primary">{q.question}</p>
                        <div className="space-y-2">
                            {q.options.map((option: string, oIndex: number) => (
                                <button
                                    key={oIndex}
                                    onClick={() => handleSelect(qIndex, option)}
                                    className={`w-full text-left p-3 rounded-lg transition-colors
                                        ${answers[qIndex] === option && !submitted ? 'bg-primary text-white' : 'bg-white'}
                                        ${submitted ? getResultColor(qIndex, option) + ' text-white' : 'hover:bg-gray-100'}
                                    `}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-6">
                <button onClick={() => setSubmitted(true)} className="bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-primary-dark">
                    Submit Answers
                </button>
            </div>
        </div>
    );
};

const Scenario = ({ data }: { data: any }) => {
    const [feedback, setFeedback] = useState('');

    return (
        <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="text-xl font-bold mb-2 text-center text-yellow-800">{data.title}</h3>
            <p className="text-text-secondary text-center mb-4">{data.description}</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
                {data.options.map((opt: any, index: number) => (
                    <button key={index} onClick={() => setFeedback(opt.feedback)} className="flex-1 bg-white p-3 rounded-lg shadow hover:bg-gray-100 font-semibold text-text-primary">
                        {opt.text}
                    </button>
                ))}
            </div>
            {feedback && <p className="mt-4 p-4 bg-white rounded-lg text-center text-text-secondary border border-yellow-300">{feedback}</p>}
        </div>
    );
};

const InteractiveTutorial = ({ course, onBack }: { course: any, onBack: () => void }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const tutorial = tutorialData[course.title as keyof typeof tutorialData];
    
    if (!tutorial) {
        return <div className="text-center p-8">
             <p className="text-lg text-red-500">Sorry, an interactive tutorial for this course is not yet available.</p>
             <button onClick={onBack} className="mt-4 inline-flex items-center bg-primary text-white font-bold py-2 px-4 rounded-full hover:bg-primary-dark transition-colors">
                <ArrowLeftIcon /> Back to Courses
            </button>
        </div>;
    }

    const steps = [
        { name: "Video", icon: <PlayIcon />, component: <VideoLecture videoId={tutorial.video} /> },
        { name: "Activity", icon: <PuzzleIcon />, component: <PlantingActivity data={tutorial.activity} /> },
        { name: "Quiz", icon: <QuestionMarkIcon />, component: <Quiz data={tutorial.quiz} /> },
        { name: "Scenario", icon: <BranchIcon />, component: <Scenario data={tutorial.scenario} /> },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <button onClick={onBack} className="inline-flex items-center bg-gray-200 text-text-secondary font-bold py-2 px-4 rounded-full hover:bg-gray-300 transition-colors">
                    <ArrowLeftIcon /> Back to Courses
                </button>
                <h1 className="text-2xl md:text-3xl font-bold text-text-primary text-center">{course.title} Tutorial</h1>
                <div/>
            </div>

            <div className="flex justify-center border-b border-gray-200 overflow-x-auto">
                {steps.map((step, index) => (
                    <button key={step.name} onClick={() => setCurrentStep(index)} className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-4 transition-colors flex-shrink-0 ${currentStep === index ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:border-gray-300'}`}>
                        {step.icon}
                        <span className="hidden md:inline">{step.name}</span>
                    </button>
                ))}
            </div>

            <div className="p-2 md:p-6 bg-surface rounded-lg shadow-inner">
                {steps[currentStep].component}
            </div>
        </div>
    );
};


// --- MAIN PAGE COMPONENTS ---
const CourseCard = ({ title, description, duration, image, onStart }: { title: string, description: string, duration: string, image: string, onStart: () => void }) => (
    <div className="bg-surface rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
        <img className="w-full h-48 object-cover" src={image} alt={title} />
        <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-text-primary">{title}</h3>
            <p className="text-text-secondary mb-4">{description}</p>
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{duration}</span>
                <button onClick={onStart} className="bg-primary text-white px-4 py-2 rounded-full font-semibold hover:bg-primary-dark transition-colors">Start Learning</button>
            </div>
        </div>
    </div>
);

const courses = [
    {
        title: "Modern Wheat Cultivation",
        description: "Learn A-Z of growing high-yield wheat from soil preparation to harvesting.",
        duration: "4 hours",
        image: "https://picsum.photos/seed/wheat/400/300"
    },
    {
        title: "Organic Vegetable Farming",
        description: "Master the principles of organic farming for healthy and sustainable produce.",
        duration: "6 hours",
        image: "https://picsum.photos/seed/vegetables/400/300"
    },
    {
        title: "Pest Management Techniques",
        description: "Integrated pest management strategies to protect your crops without harming the environment.",
        duration: "3 hours",
        image: "https://picsum.photos/seed/pest/400/300"
    },
    {
        title: "Drip Irrigation Systems",
        description: "Efficient water management techniques to save water and increase crop yield.",
        duration: "2.5 hours",
        image: "https://picsum.photos/seed/irrigation/400/300"
    },
    {
        title: "Soil Health & Nutrition",
        description: "Understand the science of soil and how to maintain its health for long-term productivity.",
        duration: "5 hours",
        image: "https://picsum.photos/seed/soil/400/300"
    },
    {
        title: "Post-Harvest Technology",
        description: "Learn the best practices for storing and processing your produce to minimize wastage.",
        duration: "3.5 hours",
        image: "https://picsum.photos/seed/harvest/400/300"
    }
];

const AgriLearn = () => {
    const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

    if (selectedCourse) {
        return <InteractiveTutorial course={selectedCourse} onBack={() => setSelectedCourse(null)} />;
    }

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary">Agri Learn</h1>
                <p className="mt-2 text-lg text-text-secondary">Your digital classroom for modern agriculture.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map(course => <CourseCard 
                    key={course.title} 
                    title={course.title} 
                    description={course.description} 
                    duration={course.duration} 
                    image={course.image} 
                    onStart={() => setSelectedCourse(course)}
                />)}
            </div>
        </div>
    );
};

export default AgriLearn;
