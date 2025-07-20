// React Imports
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// React Icons
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
// Formik Imports
import { Form, Formik, FormikProps } from "formik";
// Utils Imports
import { onKeyDown } from "../../utils";
// Validation Schema
import { signupSchema } from "./components/validationSchema";
// MUI Imports
import { Box, Button } from "@mui/material";
// Custom Imports
import { Heading, SubHeading } from "../../components/Heading";
import ToastAlert from "../../components/ToastAlert/ToastAlert";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import PrimaryPhoneInput from "../../components/PhoneInput";
// Images
import NextWhiteLogo from "../../assets/images/nexCenterLogo.svg";
import BackgroundImage from "../../assets/images/doc.png";
// Redux
import { useSignupMutation } from "../../redux/api/authApiSlice";

interface ISSignupForm {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
}

const Signup = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [formValues] = useState<ISSignupForm>({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
    });
    const [toast, setToast] = useState({
        message: "",
        appearence: false,
        type: "",
    });

    const hideShowPassword = () => setShowPassword(!showPassword);
    const handleCloseToast = () => setToast({ ...toast, appearence: false });

    const [signupUser, { isLoading }] = useSignupMutation();

    const signupHandler = async (data: ISSignupForm) => {
        const payload = { ...data };
        try {
            const user: any = await signupUser(payload);

            if (user?.data?.status) {
                setToast({
                    ...toast,
                    message: "User Successfully Created",
                    appearence: true,
                    type: "success",
                });
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            } else if (user?.error) {
                setToast({
                    ...toast,
                    message: user?.error?.data?.message || "Signup failed",
                    appearence: true,
                    type: "error",
                });
            }
        } catch {
            setToast({
                ...toast,
                message: "Something went wrong",
                appearence: true,
                type: "error",
            });
        }
    };

    return (
        <>
            <Box sx={{ display: "flex", height: "100vh", position: "relative" }}>
                <Box
                    sx={{
                        position: "fixed",
                        bottom: 0,
                        left: "-110px",
                        "@media (max-width: 576px)": { display: "none" },
                    }}
                >
                    <img src={NextWhiteLogo} alt="logo" style={{ height: 180 }} />
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: { xs: "column-reverse", md: "row" },
                        backgroundColor: "#f5fdf7",
                    }}
                >
                    {/* Left side with form */}
                    <Box
                        sx={{
                            flex: 1,
                            backgroundColor: "#fff",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                padding: "0 100px",
                                "@media (min-width: 1500px)": { padding: "0 50px", width: "550px" },
                                "@media (max-width: 991px)": { padding: "0 40px" },
                                "@media (max-width: 767px)": { padding: "0 30px" },
                            }}
                        >
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Heading
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: "30px",
                                        color: "#1c7c54",
                                    }}
                                >
                                    Create an Account
                                </Heading>

                                <Formik
                                    initialValues={formValues}
                                    onSubmit={(values) => signupHandler(values)}
                                    validationSchema={signupSchema}
                                >
                                    {(props: FormikProps<ISSignupForm>) => {
                                        const { values, touched, errors, handleBlur, handleChange } = props;

                                        return (
                                            <Form onKeyDown={onKeyDown}>
                                                <Box sx={{ mt: 3, height: "95px" }}>
                                                    <SubHeading sx={{ mb: 1 }}>Name</SubHeading>
                                                    <PrimaryInput
                                                        type="text"
                                                        name="name"
                                                        placeholder="Name"
                                                        value={values.name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={!!(errors.name && touched.name)}
                                                        helperText={touched.name && errors.name ? errors.name : ""}
                                                    />
                                                </Box>

                                                <Box sx={{ height: "95px" }}>
                                                    <SubHeading sx={{ mb: 1 }}>Email</SubHeading>
                                                    <PrimaryInput
                                                        type="text"
                                                        name="email"
                                                        placeholder="Email"
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={!!(errors.email && touched.email)}
                                                        helperText={touched.email && errors.email ? errors.email : ""}
                                                    />
                                                </Box>

                                                <Box sx={{ height: "95px" }}>
                                                    <SubHeading sx={{ mb: 1 }}>Mobile Number</SubHeading>
                                                    <PrimaryPhoneInput
                                                        value={values.phoneNumber || "+91"}
                                                        name="phoneNumber"
                                                        formik={props}
                                                        variant="outlined"
                                                        label=""
                                                    />
                                                </Box>

                                                <Box sx={{ height: "95px" }}>
                                                    <SubHeading sx={{ mb: 1 }}>Password</SubHeading>
                                                    <PrimaryInput
                                                        type={showPassword ? "text" : "password"}
                                                        name="password"
                                                        placeholder="Password"
                                                        value={values.password}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={!!(errors.password && touched.password)}
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

                                                <Box sx={{ textAlign: "center", mt: 2 }}>
                                                    <SubHeading sx={{ color: "#333", fontSize: "14px" }}>
                                                        Already have an account?{" "}
                                                        <Link
                                                            to="/login"
                                                            style={{
                                                                fontWeight: 600,
                                                                color: "#1c7c54",
                                                                textDecoration: "none",
                                                            }}
                                                            onMouseOver={(e) =>
                                                                (e.currentTarget.style.textDecoration = "underline")
                                                            }
                                                            onMouseOut={(e) =>
                                                                (e.currentTarget.style.textDecoration = "none")
                                                            }
                                                        >
                                                            Login
                                                        </Link>
                                                    </SubHeading>
                                                </Box>

                                                <Box sx={{ display: "flex", justifyContent: "end", mt: 3 }}>
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        fullWidth
                                                        disabled={isLoading}
                                                        sx={{
                                                            backgroundColor: "#1c7c54",
                                                            color: "#fff",
                                                            fontWeight: "bold",
                                                            py: 1.5,
                                                            textTransform: "capitalize",
                                                            "&:hover": {
                                                                backgroundColor: "#166947",
                                                            },
                                                        }}
                                                    >
                                                        {isLoading ? "Signing Up..." : "Sign Up"}
                                                    </Button>
                                                </Box>
                                            </Form>
                                        );
                                    }}
                                </Formik>
                            </Box>
                        </Box>
                    </Box>

                    {/* Right Image Section (smaller width) */}
                    <Box
                        sx={{
                            width: { xs: "100%", md: "45%" },
                            backgroundImage: `url(${BackgroundImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            minHeight: { xs: "200px", md: "100vh" },
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

export default Signup;
