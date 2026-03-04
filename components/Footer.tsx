
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white mt-auto">
            <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
                <p>&copy; {new Date().getFullYear()} KRISHI+. All rights reserved.</p>
                <p className="text-sm text-gray-400 mt-2">Empowering Farmers with Technology</p>
            </div>
        </footer>
    );
};

export default Footer;
