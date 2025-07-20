import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import docImage from "../../assets/images/doc.png";


const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#bdc9ca",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        px: 4,
        py: 8,
        gap: 4,
      }}
    >
        <Box
            component="img"
            src={docImage}
            alt="Doctors"
            sx={{
                maxWidth: { xs: "80%", md: "40%" },
                height: "auto",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
        />
      <Box
        sx={{
          maxWidth: { xs: "100%", md: "40%" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Effortlessly schedule your doctor
        </Typography>
        <Typography variant="body1" mb={3}>
          appointments with just a few clicks, putting your health in your hands.
        </Typography>
        <Button
          variant="contained"
          color="warning"
          onClick={() => navigate("/login")}
          sx={{ borderRadius: 4, px: 4, py: 1.5 }}
        >
          Book your Doctor
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
