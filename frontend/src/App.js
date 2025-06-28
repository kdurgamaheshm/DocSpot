import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './context/AuthContext';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './components/UserDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import BookAppointment from './components/BookAppointment';
import AppointmentHistory from './components/AppointmentHistory';
import Profile from './components/Profile';
import ChangePassword from './components/ChangePassword';
import EditProfile from './components/EditProfile';
import Appointments from './components/Appointments';
import Header from './components/Header';
import './styles.css';

const PublicLayout = () => {
  const location = useLocation();
  const hideHeaderPaths = ['/', '/login', '/register'];
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
      <div className="app-container">
        {!shouldHideHeader && <Header />}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
  );
};

function App() {
  return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="book-appointment" element={<BookAppointment />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="profile" element={<Profile />} />
              <Route path="edit-profile" element={<EditProfile />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="history" element={<AppointmentHistory />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
  );
}

export default App;
