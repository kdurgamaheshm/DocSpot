import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 text-black px-4">
            <div className="max-w-2xl text-center space-y-6">
                <h1 className="text-4xl font-bold text-green-800">Welcome to <span className="text-green-600">DocSpot</span></h1>
                <p className="text-lg text-gray-700">
                    Your trusted platform for managing doctor appointments, availability, and patient care.
                </p>
                <div className="flex justify-center gap-6 mt-6">
                    <Link
                        to="/login"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium shadow"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="bg-white border border-green-600 hover:bg-green-50 text-green-700 px-6 py-2 rounded-lg font-medium shadow"
                    >
                        Register
                    </Link>
                </div>
            </div>
            <div className="flex-1 flex flex-col w-full md:ml-64">
                Header
                <header className="fixed top-0 left-0 right-0 z-50 bg-green-600 text-white h-16 flex items-center px-6 shadow-md">
                    <div
                        className="text-2xl font-bold cursor-pointer">

                        🩺DocSpot
                    </div>
                </header>
            </div>
        </div>
    );
};

export default LandingPage;
