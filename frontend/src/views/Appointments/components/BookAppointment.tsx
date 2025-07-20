import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    useBookedAppointmentsQuery,
    useCheckBookingAvailabilityMutation,
    useGetDoctorQuery,
} from "../../../redux/api/doctorSlice";
import {
    add30Minutes,
    convertToAMPMFormat,
    formatDate,
    formatTime,
    onKeyDown,
    thousandSeparatorNumber,
} from "../../../utils";
import { RiLuggageDepositLine } from "react-icons/ri";
import { MdOutlineExplicit } from "react-icons/md";
import { CiLocationOn, CiMoneyCheck1 } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import Typography from "@mui/material/Typography";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Box, Grid, Divider, Button, TextField } from "@mui/material";
import DatePicker from "../../../components/DatePicker";
// Removed Navbar import
import { Heading, SubHeading } from "../../../components/Heading";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import useTypedSelector from "../../../hooks/useTypedSelector";
import { selectedUserId, userIsDoctor } from "../../../redux/auth/authSlice";
import {
    useBookAppointmentMutation,
    useGetUserQuery,
} from "../../../redux/api/userSlice";
import ToastAlert from "../../../components/ToastAlert/ToastAlert";

const AppointmentSchema = Yup.object().shape({
    date: Yup.string().required("Date is required"),
    time: Yup.string().required("Time is required"),
});

interface AppointmentForm {
    date: string | null;
    time: string | null;
}

const InfoRow = ({
                     icon,
                     label,
                     value,
                 }: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) => (
    <Box display="flex" justifyContent="space-between" alignItems="start" gap={2}>
        <Box display="flex" alignItems="center" gap={1} minWidth="150px">
            {icon}
            <Typography variant="body2" color="#222">{label}</Typography>
        </Box>
        <Typography
            variant="body2"
            sx={{
                textAlign: "right",
                wordBreak: "break-word",
                maxWidth: "220px",
                fontWeight: 500,
                color: "#444",
            }}
        >
            {value}
        </Typography>
    </Box>
);

const BookAppointment = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const loginUserId = useTypedSelector(selectedUserId);
    const isDoctor = useTypedSelector(userIsDoctor);
    const [isAvailable, setIsAvailable] = useState(false);
    const [appointment, setAppointment] = useState("");
    const [formValues, setFormValues] = useState<AppointmentForm>({
        date: null,
        time: null,
    });

    const [toast, setToast] = useState({
        message: "",
        appearence: false,
        type: "",
    });

    const handleCloseToast = () => setToast({ ...toast, appearence: false });

    const { data, isLoading } = useGetDoctorQuery({ userId });
    const { data: logedInUserData, isLoading: logedInUserLoading } =
        useGetUserQuery({ userId: loginUserId });
    const { data: getAppointmentData, isLoading: getAppointmentLoading } =
        useBookedAppointmentsQuery({ userId });

    const [bookAppointment, { isLoading: appointmentLoading }] =
        useBookAppointmentMutation();

    const [checkBookingAvailability, { isLoading: checkBookingLoading }] =
        useCheckBookingAvailabilityMutation();

    const appointmentHandler = async (appointmentData: AppointmentForm) => {
        // Format time to "HH:mm" string if time is not null
        const formattedTime = appointmentData.time ? dayjs(appointmentData.time).format("HH:mm") : null;

        if (appointment === "checkAvailability") {
            try {
                const payload = {
                    doctorId: userId,
                    date: appointmentData.date,
                    time: formattedTime,
                };
                const doctorAvailability: any = await checkBookingAvailability(payload);

                if (doctorAvailability?.data?.status) {
                    setIsAvailable(true);
                    setToast({
                        message: doctorAvailability.data.message,
                        appearence: true,
                        type: "success",
                    });
                } else {
                    setToast({
                        message: doctorAvailability?.error?.data?.message || "Error",
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
        }

        if (appointment === "bookAppointment") {
            try {
                const payload = {
                    doctorId: userId,
                    userId: loginUserId,
                    doctorInfo: data?.data,
                    userInfo: logedInUserData?.data,
                    date: appointmentData.date,
                    time: formattedTime,
                };
                const userAppointment: any = await bookAppointment(payload);

                if (userAppointment?.data?.status) {
                    setIsAvailable(false);
                    setToast({
                        message: userAppointment.data.message,
                        appearence: true,
                        type: "success",
                    });
                    setTimeout(() => {
                        navigate(isDoctor ? "/doctors/appointments" : "/appointments");
                    }, 1500);
                } else {
                    setToast({
                        message: userAppointment?.error?.data?.message || "Error",
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
        }
    };

    return (
        <>
            {(isLoading || logedInUserLoading || getAppointmentLoading) && <OverlayLoader />}
            <>
                <Heading >Book Appointments</Heading>
                <Grid container spacing={4} sx={{ mt: 1 }}>
                    {/* Form Section */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                p: 3,
                                background: "linear-gradient(to right, #dfe9f3 0%, white 100%)",
                                borderRadius: 3,
                                boxShadow: 4,
                                color:"black",
                            }}
                        >
                            <Heading sx={{ fontSize: "20px", mb: 1 ,color:"black"}}>Timings</Heading>
                            <Divider sx={{ mb: 2 }} />
                            <Box display="flex" alignItems="center" gap={1} mb={2}>
                                <IoMdTime />
                                <Typography>
                                    {convertToAMPMFormat(data?.data?.fromTime)} to{" "}
                                    {convertToAMPMFormat(data?.data?.toTime)}
                                </Typography>
                            </Box>

                            <Formik
                                initialValues={formValues}
                                onSubmit={(values) => appointmentHandler(values)}
                                validationSchema={AppointmentSchema}
                                enableReinitialize
                            >
                                {(props: FormikProps<AppointmentForm>) => {
                                    const { values, touched, errors, setFieldValue } = props;
                                    return (
                                        <Form onKeyDown={onKeyDown}>
                                            <Box display="flex" flexDirection="column" gap={3}>
                                                <Box>
                                                    <SubHeading sx={{color:"black"}}>Select Appointment Date</SubHeading>
                                                    <DatePicker
                                                        minDate={new Date()}
                                                        value={values.date}
                                                        handleChange={(val: any) => {
                                                            setFieldValue("date", val);
                                                            setIsAvailable(false);
                                                        }}
                                                    />
                                                    {errors.date && touched.date && (
                                                        <Typography color="error" fontSize="0.75rem" mt={0.5}>
                                                            {errors.date}
                                                        </Typography>
                                                    )}
                                                </Box>

                                                <Box>
                                                    <SubHeading sx={{color:"black"}}>Select Appointment Time</SubHeading>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <TimePicker
                                                            value={values.time}
                                                            onChange={(val) => {
                                                                setFieldValue("time", val);
                                                                setIsAvailable(false);
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    fullWidth
                                                                    size="small"
                                                                    sx={{
                                                                        background: "linear-gradient(to right, #dfe9f3 0%, white 100%)",
                                                                        borderRadius: 1,
                                                                        "& .MuiOutlinedInput-root": {
                                                                            "& fieldset": { borderColor: "#ccc" },
                                                                            "&:hover fieldset": { borderColor: "#888" },
                                                                            "&.Mui-focused fieldset": {
                                                                                borderColor: "#1976d2",
                                                                            },
                                                                        },
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </LocalizationProvider>
                                                    {errors.time && touched.time && (
                                                        <Typography color="error" fontSize="0.75rem" mt={0.5}>
                                                            {errors.time}
                                                        </Typography>
                                                    )}
                                                </Box>

                                                <Box display="flex" flexDirection="column" gap={2}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        fullWidth
                                                        type="submit"
                                                        onClick={() => setAppointment("checkAvailability")}
                                                        sx={{
                                                            py: 1.3,
                                                            fontWeight: 600,
                                                            borderRadius: 2,
                                                            background: "#1976d2",
                                                            ":hover": {
                                                                background: "#115293",
                                                                transform: "scale(1.01)",
                                                            },
                                                        }}
                                                    >
                                                        {checkBookingLoading ? "Checking..." : "Check Availability"}
                                                    </Button>

                                                    {isAvailable && (
                                                        <Button
                                                            variant="outlined"
                                                            color="success"
                                                            fullWidth
                                                            type="submit"
                                                            onClick={() => setAppointment("bookAppointment")}
                                                            sx={{
                                                                py: 1.3,
                                                                fontWeight: 600,
                                                                borderRadius: 2,
                                                                ":hover": {
                                                                    backgroundColor: "#e0f7e9",
                                                                    transform: "scale(1.01)",
                                                                },
                                                            }}
                                                        >
                                                            {appointmentLoading ? "Booking..." : "Book Appointment"}
                                                        </Button>
                                                    )}
                                                </Box>
                                            </Box>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </Box>
                    </Grid>

                    {/* Doctor Info */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                p: 3,
                                background: "linear-gradient(to right, #dfe9f3 0%, white 100%)",
                                borderRadius: 3,
                                boxShadow: 4,
                            }}
                        >
                            <Heading sx={{ fontSize: "20px", mb: 1, color: "#000" }}>
                                {`${data?.data?.prefix} ${data?.data?.fullName}`}{" "}
                                <Typography variant="body2" component="span">
                                    ({data?.data?.specialization})
                                </Typography>
                            </Heading>
                            <Divider sx={{ mb: 2 }} />
                            <Box display="flex" flexDirection="column" gap={2}>
                                <InfoRow icon={<IoMdTime />} label="Consultation Time" value="30 Minutes" />
                                <InfoRow icon={<RiLuggageDepositLine />} label="Department" value={data?.data?.specialization} />
                                <InfoRow icon={<MdOutlineExplicit />} label="Experience" value={`${data?.data?.experience} Years`} />
                                <InfoRow icon={<CiMoneyCheck1 />} label="Fee Per Visit" value={thousandSeparatorNumber(data?.data?.feePerConsultation)} />
                                <InfoRow icon={<CiLocationOn />} label="Location" value={data?.data?.address} />
                            </Box>
                        </Box>
                    </Grid>

                    {/* Booked Slots */}
                    {getAppointmentData?.data?.length > 0 && (
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    p: 3,
                                    backgroundColor: "#ffffff",
                                    borderRadius: 3,
                                    boxShadow: 2,
                                }}
                            >
                                <Heading sx={{ fontSize: "20px", mb: 1 }}>Booked Appointments</Heading>
                                <Divider sx={{ mb: 2 }} />
                                {getAppointmentData?.data?.map((item: any, i: number) => (
                                    <Box key={i} display="flex" justifyContent="space-between" mb={1}>
                                        <Typography>{formatDate(item?.date)}</Typography>
                                        <Box
                                            sx={{
                                                backgroundColor: "#f1f1f1",
                                                px: 2,
                                                py: 0.5,
                                                borderRadius: 2,
                                                fontSize: "0.875rem",
                                            }}
                                        >
                                            {`${formatTime(item?.time)} - ${formatTime(add30Minutes(item?.time))}`}
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </>
            {/* Toast */}
            <ToastAlert
                appearence={toast.appearence}
                type={toast.type}
                message={toast.message}
                handleClose={handleCloseToast}
            />
        </>
    );
};

export default BookAppointment;
