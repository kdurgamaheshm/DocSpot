// src/components/Navbar/index.tsx

import React, { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Typography,
  Badge,
  CssBaseline,
  useTheme,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import {
  IoNotificationsCircleOutline,
  IoHomeOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import { FaUserDoctor, FaRegCircleUser, FaUsers } from "react-icons/fa6";
import useTypedSelector from "../../hooks/useTypedSelector";
import {
  selectedUserId,
  selectedUserName,
  selectedUserNotifications,
  userIsAdmin,
  userIsDoctor,
} from "../../redux/auth/authSlice";
import CustomChip from "../CustomChip";

// Background animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  background: "linear-gradient(-45deg, #0F2027, #203A43, #2C5364)",
  backgroundSize: "400% 400%",
  animation: `${gradientAnimation} 15s ease infinite`,
  color: "#fff",
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
}));

interface DashboardProps {
  children?: React.ReactNode;
  simple?: boolean;
}

export default function Navbar({ children, simple = false }: DashboardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = useTypedSelector(selectedUserName);
  const isAdmin = useTypedSelector(userIsAdmin);
  const isDoctor = useTypedSelector(userIsDoctor);
  const userId = useTypedSelector(selectedUserId);
  const userNotifications = useTypedSelector(selectedUserNotifications);

  if (simple) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", p: 2, backgroundColor: "#0F2027" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "1.5rem",
          }}
        >
          🩺DocSpot
        </Typography>
      </Box>
    );
  }

  const menuItems = isAdmin
      ? [
        { text: "Home", icon: <IoHomeOutline />, path: "/" },
        { text: "Users", icon: <FaUsers />, path: "/users" },
        { text: "Doctors", icon: <FaUserDoctor />, path: "/doctors" },
        { text: "Admin Analysis", icon: <IoDocumentTextOutline />, path: "/admin-analysis" },
        { text: "Profile", icon: <FaRegCircleUser />, path: `/profile/${userId}` },
      ]
      : isDoctor
          ? [
            { text: "Home", icon: <IoHomeOutline />, path: "/" },
            { text: "Appointments", icon: <IoDocumentTextOutline />, path: "/doctors/appointments" },
            { text: "Profile", icon: <FaRegCircleUser />, path: `/profile/${userId}` },
          ]
          : [
            { text: "Home", icon: <IoHomeOutline />, path: "/" },
            { text: "Appointments", icon: <IoDocumentTextOutline />, path: "/appointments" },
            { text: "Apply Doctor", icon: <FaUserDoctor />, path: "/apply-doctor" },
            { text: "Profile", icon: <FaRegCircleUser />, path: `/profile/${userId}` },
          ];

  const chipLabel = isAdmin ? "Admin" : isDoctor ? "Doctor" : "User";

  return (
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1, md: 3 } }}>
            {/* Left: Title */}
            <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  textDecoration: "none",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                }}
            >
              🩺DocSpot
            </Typography>

            {/* Center: Menu */}
            <Box sx={{ display: "flex", gap: 2, flexGrow: 1, ml: 4 }}>
              {menuItems.map((item) => (
                  <Button
                      key={item.text}
                      component={Link}
                      to={item.path}
                      startIcon={item.icon}
                      sx={{
                        color: location.pathname === item.path ? "#00f7ff" : "#f0f0f0",
                        backgroundColor:
                            location.pathname === item.path ? "rgba(255, 255, 255, 0.15)" : "transparent",
                        borderRadius: "6px",
                        px: 2,
                        fontWeight: 500,
                        textTransform: "none",
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          color: "#00f7ff",
                        },
                      }}
                  >
                    {item.text}
                  </Button>
              ))}
            </Box>

            {/* Right: User + Notifications + Logout */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {userName}
              </Typography>
              <CustomChip label={chipLabel} />

              <IconButton
                  color="inherit"
                  onClick={() => navigate("/notifications")}
                  sx={{ color: "#ffffff" }}
              >
                <Badge
                    badgeContent={userNotifications?.length || 0}
                    color="error"
                    overlap="circular"
                >
                  <IoNotificationsCircleOutline size={24} />
                </Badge>
              </IconButton>

              {/* Modern Logout Button */}
              <Button
                  onClick={() => {
                    localStorage.removeItem("user");
                    navigate("/login");
                  }}
                  variant="outlined"
                  sx={{
                    color: "#fff",
                    borderColor: "#fff",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderColor: "#00f7ff",
                      color: "#00f7ff",
                    },
                  }}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box component="main" sx={{ flex: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
  );
}
