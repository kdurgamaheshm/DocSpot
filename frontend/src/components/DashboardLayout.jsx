import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const DashboardLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isDoctor = user?.role === 'Doctor';
    const isAdmin = user?.role === 'Admin';

    return (
        <div className="flex w-screen h-screen bg-white overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 hidden md:flex flex-col bg-green-100 border-r border-green-200 shadow-lg pt-16 fixed top-0 left-0 bottom-0 z-40">
                <nav className="flex flex-col p-4 space-y-2 text-green-900">
                    <SidebarLink to="/app/dashboard" label="Dashboard" />
                    {isDoctor && <SidebarLink to="/app/doctor-dashboard" label="Doctor Dashboard" />}
                    { isAdmin&&<SidebarLink to="/app/admin-dashboard" label="Admin Dashboard" />}
                    <SidebarLink to="/app/book-appointment" label="Book Appointment" />
                    <SidebarLink to="/app/appointments" label="Appointment History" />
                    <SidebarLink to="/app/profile-page" label="MY Profile" />
                    <SidebarLink to="/app/edit-profile" label="Edit Profile" />
                    <SidebarLink to="/app/change-password" label="Change Password" />
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col w-full md:ml-64">
                {/* Header */}
                <header className="fixed top-0 left-0 right-0 z-50 bg-green-600 text-white h-16 flex items-center justify-between px-6 shadow-md">
                    <div
                        className="text-2xl font-bold cursor-pointer"
                        onClick={() => navigate('/app/dashboard')}
                    >
                        🩺DocSpot
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
                    >
                        Logout
                    </button>
                </header>

                {/* Page Content */}
                <main className="pt-20 px-4 pb-10 flex-1 overflow-y-auto bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

const SidebarLink = ({ to, label }) => (
    <Link
        to={to}
        className="block px-4 py-2 rounded hover:bg-green-200 font-medium transition"
    >
        {label}
    </Link>
);

export default DashboardLayout;
