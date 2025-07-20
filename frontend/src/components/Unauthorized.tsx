import React from "react";
import { Box, Typography } from "@mui/material";

const Unauthorized = () => {
  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography variant="h3" color="error" gutterBottom>
        Unauthorized Access
      </Typography>
      <Typography variant="body1">
        You do not have permission to view this page.
      </Typography>
    </Box>
  );
};

export default Unauthorized;
