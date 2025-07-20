import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, FormikProps, Form } from "formik";
import { Box, Button, Typography } from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { loginSchema } from "./components/validationSchema";
import { onKeyDown } from "../../utils";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import { SubHeading } from "../../components/Heading";
import { useLoginMutation } from "../../redux/api/authApiSlice";
import { setUser } from "../../redux/auth/authSlice";
import ToastAlert from "../../components/ToastAlert/ToastAlert";
import BackgroundImage from "../../assets/images/photo1.png";
import BottomLogo from "../../assets/images/bottomLogo.svg";

interface ISLoginForm {
    email: string;
    password: string;
}

// ... all imports stay the same

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [formValues] = useState<ISLoginForm>({ email: "", password: "" });
    const [toast, setToast] = useState({
        message: "",
        appearence: false,
        type: "",
    });

    const hideShowPassword = () => setShowPassword(!showPassword);
    const handleCloseToast = () =>
        setToast({ ...toast, appearence: false });

    const [loginUser, { isLoading }] = useLoginMutation();

    const LoginHandler = async (data: ISLoginForm) => {
        try {
            const user: any = await loginUser(data);
            if (user?.data?.status) {
                dispatch(setUser(user.data));
                localStorage.setItem("user", JSON.stringify(user.data));
                navigate("/");
            } else if (user?.error) {
                setToast({
                    message: user?.error?.data?.message || "Login failed",
                    appearence: true,
                    type: "error",
                });
            }
        } catch {
            setToast({
                message: "Something went wrong",
                appearence: true,
                type: "error",
            });
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    height: "100vh",
                    backgroundColor: "#f4f6f8",
                    position: "relative",
                }}
            >
                {/* Bottom Logo */}
                <Box
                    sx={{
                        position: "fixed",
                        bottom: 0,
                        right: "-175px",
                        zIndex: 0,
                        "@media (max-width: 576px)": { display: "none" },
                    }}
                >
                    <img
                        src={BottomLogo}
                        alt="bottom logo"
                        style={{ transform: "rotate(-6deg)", height: "200px" }}
                    />
                </Box>

                {/* Layout */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column-reverse", md: "row" },
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {/* Login Card */}
                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 3,
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                maxWidth: "420px",
                                padding: 4,
                                borderRadius: "16px",
                                background: "#ffffff",
                                boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                                animation: "fadeIn 0.8s ease-in-out",
                            }}
                        >
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    fontSize: "26px",
                                    fontWeight: 700,
                                    mb: 1,
                                    color: "#1a3b34", // Deep green text
                                }}
                            >
                                Welcome to Book A Doctor
                            </Typography>

                            <Typography
                                sx={{
                                    textAlign: "center",
                                    fontSize: "16px",
                                    color: "#6c757d",
                                    mb: 4,
                                }}
                            >
                                Please log in to continue
                            </Typography>

                            <Formik
                                initialValues={formValues}
                                onSubmit={LoginHandler}
                                validationSchema={loginSchema}
                            >
                                {(props: FormikProps<ISLoginForm>) => {
                                    const {
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                    } = props;

                                    return (
                                        <Form onKeyDown={onKeyDown}>
                                            <Box sx={{ mb: 3 }}>
                                                <SubHeading sx={{ color: "#1a3b34", mb: 1 }}>
                                                    Email
                                                </SubHeading>
                                                <PrimaryInput
                                                    name="email"
                                                    placeholder="Email address"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={!!(touched.email && errors.email)}
                                                    helperText={touched.email && errors.email ? errors.email : ""}
                                                />
                                            </Box>

                                            <Box sx={{ mb: 2 }}>
                                                <SubHeading sx={{ color: "#1a3b34", mb: 1 }}>
                                                    Password
                                                </SubHeading>
                                                <PrimaryInput
                                                    name="password"
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={!!(touched.password && errors.password)}
                                                    helperText={touched.password && errors.password ? errors.password : ""}
                                                    onClick={hideShowPassword}
                                                    endAdornment={
                                                        showPassword ? (
                                                            <AiOutlineEye color="#999" />
                                                        ) : (
                                                            <AiOutlineEyeInvisible color="#999" />
                                                        )
                                                    }
                                                />
                                            </Box>

                                            <Box sx={{ textAlign: "right", mb: 3 }}>
                                                <Link to="/forgot-password" style={{ fontSize: "14px", color: "#28a745", textDecoration: "none" }}>
                                                    Forgot password?
                                                </Link>
                                            </Box>

                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                disabled={isLoading}
                                                sx={{
                                                    backgroundColor: "#28a745", // ServiceNow green
                                                    textTransform: "none",
                                                    fontWeight: "bold",
                                                    padding: "12px",
                                                    borderRadius: "10px",
                                                    fontSize: "16px",
                                                    transition: "0.3s",
                                                    "&:hover": {
                                                        backgroundColor: "#218838", // darker green on hover
                                                        transform: "scale(1.02)",
                                                    },
                                                }}
                                            >
                                                {isLoading ? "Logging in..." : "Login"}
                                            </Button>

                                            <Box sx={{ textAlign: "center", mt: 4 }}>
                                                <Typography sx={{ fontSize: "14px", color: "#4a5568" }}>
                                                    New here?{" "}
                                                    <Link
                                                        to="/signup"
                                                        style={{
                                                            fontWeight: 600,
                                                            color: "#28a745",
                                                            textDecoration: "none",
                                                        }}
                                                    >
                                                        Create a new account
                                                    </Link>
                                                </Typography>
                                            </Box>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </Box>
                    </Box>

                    {/* Background Image Section */}
                    <Box
                        sx={{
                            flex: 1,
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${BackgroundImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            transition: "all 0.4s ease-in-out",
                            minHeight: { xs: "200px", md: "100%" },
                        }}
                    />
                </Box>
            </Box>

            <ToastAlert
                appearence={toast.appearence}
                type={toast.type}
                message={toast.message}
                handleClose={handleCloseToast}
            />
        </>
    );
};

export default Login;
