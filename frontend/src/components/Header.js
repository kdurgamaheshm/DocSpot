import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const activeClass = 'text-blue-800 font-semibold px-3 py-2';
    const inactiveClass = 'text-blue-600 hover:text-blue-800 font-medium px-3 py-2';

    return (
        <>
            {/* Fixed Header */}
            <header className="max-h-screenbg-green-300 shadow-md px-4 py-2 flex justify-between items-center fixed w-full z-50 top-0 left-0">
                <div
                    className="text-blue-600 font-bold text-xl cursor-pointer select-none"
                    onClick={() => {
                        navigate('/app/dashboard');
                        setMobileMenuOpen(false);
                    }}
                >
                    DocSpot
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-4">
                    <NavLink to="/app/dashboard" className={({ isActive }) => isActive ? activeClass : inactiveClass}>Dashboard</NavLink>
                    <NavLink to="/app/appointments" className={({ isActive }) => isActive ? activeClass : inactiveClass}>Appointments</NavLink>
                    <NavLink to="/app/book-appointment" className={({ isActive }) => isActive ? activeClass : inactiveClass}>Book</NavLink>
                    <NavLink to="/app/edit-profile" className={({ isActive }) => isActive ? activeClass : inactiveClass}>Edit Profile</NavLink>
                    <NavLink to="/app/change-password" className={({ isActive }) => isActive ? activeClass : inactiveClass}>Password</NavLink>
                    <button
                        onClick={handleLogout}
                        className="text-blue-600 hover:text-red-600 font-medium px-3 py-2"
                    >
                        Logout
                    </button>
                </nav>

                {/* Hamburger for Mobile */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
                        aria-label="Toggle menu"
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? (
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white shadow-md absolute top-16 left-0 w-full z-40 transition-all duration-200 ease-in-out">
                    <nav className="flex flex-col p-4 space-y-2">
                        <NavLink to="/app/dashboard" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : inactiveClass}>Dashboard</NavLink>
                        <NavLink to="/app/appointments" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : inactiveClass}>Appointments</NavLink>
                        <NavLink to="/app/book-appointment" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : inactiveClass}>Book Appointment</NavLink>
                        <NavLink to="/app/edit-profile" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : inactiveClass}>Edit Profile</NavLink>
                        <NavLink to="/app/change-password" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : inactiveClass}>Change Password</NavLink>
                        <button
                            onClick={() => {
                                handleLogout();
                                setMobileMenuOpen(false);
                            }}
                            className="text-red-600 font-medium px-3 py-2 text-left"
                        >
                            Logout
                        </button>
                    </nav>
                </div>
            )}
        </>
    );
};

export default Header;
