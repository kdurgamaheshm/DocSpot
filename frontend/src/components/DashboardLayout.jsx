import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const DashboardLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
      <div className="flex flex-col min-h-screen  items-center justify-center">
        {/* Top Header */}
        <header className="bg-green-600 text-white fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 z-50 shadow-md">
          <div className="text-xl font-bold">DocSpot</div>
          <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </header>

        {/* Content */}
        <div className="flex flex-1 pt-16">
          {/* Sidebar */}
          <aside className="w-64 bg-green-100 p-4 hidden md:block min-h-[calc(100vh-4rem)] sticky top-16 shadow-lg">
            <ul className="space-y-3">
              <li>
                <Link
                    to="/app/dashboard"
                    className="block px-3 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                    to="/app/doctor-dashboard"
                    className="block px-3 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                >
                  Doctor Dashboard
                </Link>
              </li>
              <li>
                <Link
                    to="/app/book-appointment"
                    className="block px-3 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                >
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link
                    to="/app/appointments"
                    className="block px-3 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                >
                  Appointment History
                </Link>
              </li>
              <li>
                <Link
                    to="/app/profile"
                    className="block px-3 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                    to="/app/change-password"
                    className="block px-3 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                >
                  Change Password
                </Link>
              </li>
            </ul>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-gray-50 min-h-[calc(100vh-4rem)] overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
  );
};

export default DashboardLayout;
