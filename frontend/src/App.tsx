import React from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import { userIsAdmin } from "./redux/auth/authSlice";
import Login from "./views/Login";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import Appointments from "./views/Appointments";
import ApplyDoctor from "./views/ApplyDoctor";
import Profile from "./views/Profile";
import Doctors from "./views/Doctors";
import Users from "./views/Users";
import Notifications from "./views/Notifications";
import { useVerifyUserQuery } from "./redux/api/userSlice";
import { useDispatch } from "react-redux";
import { selectedUserId, setUser } from "./redux/auth/authSlice";
import OverlayLoader from "./components/Spinner/OverlayLoader";
import BookAppointment from "./views/Appointments/components/BookAppointment";
import DoctorAppointment from "./views/Appointments/components/DoctorAppointment";
import useTypedSelector from "./hooks/useTypedSelector";
import AdminGraphAnalysis from "./components/AdminGraphAnalysis";
import Unauthorized from "./components/Unauthorized";
import MainLayout from "./components/MainLayout";
import LandingPage from "./views/LandingPage";
import Navbar from "./components/Navbar";

const SimpleLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar simple />
      {children}
    </>
  );
};

function App() {
  const dispatch = useDispatch();
  const userId = useTypedSelector(selectedUserId);

  const { data, isLoading, isSuccess } = useVerifyUserQuery({ userId });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData!);
    if (isSuccess) {
      const updatedUser = {
        ...user,
        data: {
          ...user.data,
          user: {
            ...user.data.user,
            ...data.data.user, // Merge full user data from verified user response
            seenNotifications: data.data.seenNotifications,
            unseenNotifications: data.data.unseenNotifications,
          },
        },
      };
      dispatch(setUser(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  }, [data]);

  return (
    <>
      {isLoading && <OverlayLoader />}
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <SimpleLayout>
                  <Login />
                </SimpleLayout>
              </PublicRoutes>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoutes>
                <SimpleLayout>
                  <Signup />
                </SimpleLayout>
              </PublicRoutes>
            }
          />
          {/* Landing page route for unauthenticated users */}
          <Route
            path="/"
            element={
              !userId ? (
                <SimpleLayout>
                  <LandingPage />
                </SimpleLayout>
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          {/* Protected Routes with MainLayout */}
          <Route
            element={
              <ProtectedRoutes>
                <MainLayout />
              </ProtectedRoutes>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-analysis" element={<AdminAnalysisRoute />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/doctors/appointments" element={<DoctorAppointment />} />
            <Route path="/book-appointments/:userId" element={<BookAppointment />} />
            <Route path="/apply-doctor" element={<ApplyDoctor />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}




const AdminAnalysisRoute = () => {
  const isAdmin = useTypedSelector(userIsAdmin);
  if (isAdmin) {
    return <AdminGraphAnalysis />;
  } else {
    return <Unauthorized />;
  }
};

export default App;
