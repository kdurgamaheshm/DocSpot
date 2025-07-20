// React Imports
import React from "react";
// MUI Imports
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { SxProps, Theme } from "@mui/system";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Custom slide transition for smooth entry
function SlideTransition(props: any) {
    return <Slide {...props} direction="down" />;
}

const toastStyle: SxProps<Theme> = {
    width: "100%",
    fontSize: "14px",
    borderRadius: "8px",
    boxShadow: 3,
};

const successStyle: SxProps<Theme> = {
    backgroundColor: "#4caf50", // Green
    color: "#fff",
};

const errorStyle: SxProps<Theme> = {
    backgroundColor: "#f44336", // Red
    color: "#fff",
};

const warningStyle: SxProps<Theme> = {
    backgroundColor: "#ff9800", // Orange
    color: "#fff",
};

const infoStyle: SxProps<Theme> = {
    backgroundColor: "#2196f3", // Blue
    color: "#fff",
};

const getToastStyle = (type: string) => {
    switch (type) {
        case "success":
            return { ...toastStyle, ...successStyle };
        case "error":
            return { ...toastStyle, ...errorStyle };
        case "warning":
            return { ...toastStyle, ...warningStyle };
        case "info":
            return { ...toastStyle, ...infoStyle };
        default:
            return toastStyle;
    }
};

export default function ToastAlert({
                                       appearence,
                                       type,
                                       message,
                                       handleClose,
                                   }: any) {
    return (
        <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={appearence}
                onClose={handleClose}
                autoHideDuration={4000}
                TransitionComponent={SlideTransition}
            >
                <Alert
                    onClose={handleClose}
                    severity={type || "error"}
                    sx={getToastStyle(type)}
                >
                    {message || "Failed"}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
