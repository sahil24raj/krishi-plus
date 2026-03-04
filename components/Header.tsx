
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const LeafIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A1 1 0 013.707 9H4V5a1 1 0 011-1h10a1 1 0 011 1v4h.293a1 1 0 01.414.293zM10 4a1 1 0 100-2 1 1 0 000 2z" />
        <path fillRule="evenodd" d="M5 10.293V15a1 1 0 001 1h8a1 1 0 001-1v-4.707l-4.293 4.293a1 1 0 01-1.414 0L5 10.293z" clipRule="evenodd" />
    </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const NavLink: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void }> = ({ to, children, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
        <Link 
            to={to} 
            onClick={onClick}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary hover:bg-green-100'}`}>
            {children}
        </Link>
    );
};


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { path: "/", name: "Home" },
        { path: "/agri-learn", name: "Agri Learn" },
        { path: "/ai-detector", name: "AI Detector" },
        { path: "/ai-alert", name: "AI Alert" },
        { path: "/krishi-parivaar", name: "Krishi Parivaar" },
        { path: "/crop-planning", name: "Crop Planning" },
        { path: "/apni-dukaan", name: "Apni Dukaan" },
    ];

    return (
        <header className="bg-surface shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                           <LeafIcon />
                           <span className="font-bold text-xl text-primary">KRISHI+</span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map(link => <NavLink key={link.path} to={link.path}>{link.name}</NavLink>)}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="bg-green-100 inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map(link => (
                            <Link 
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${useLocation().pathname === link.path ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary hover:bg-green-100'}`}>
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
