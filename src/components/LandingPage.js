import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <div>
        <div className="relative pt-16 pb-2 overflow-hidden">
            <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">Manage Traffic Challans Online</h1>
                <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600 sm:text-xl md:mt-5 md:max-w-3xl">
                The E-Challan Management System allows personnel to register violator details and generate reports or challans online.
                </p>
                <div className="mt-10">
                <button onClick={handleSignup} className="inline-block px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-amber-500 hover:bg-gray-200 hover:text-black">Register</button>
                </div>
            </div>
            </div>
        </div>
    </div>
    );
};

export default LandingPage;
