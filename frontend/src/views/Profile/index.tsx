import { useState, useEffect } from "react";
import useTypedSelector from "../../hooks/useTypedSelector";
import { Form, Formik, FormikProps } from "formik";
import { onKeyDown } from "../../utils";
import { selectedUserId, userIsDoctor } from "../../redux/auth/authSlice";
import {
  useGetDoctorQuery,
  useUpdateDoctorMutation,
} from "../../redux/api/doctorSlice";
import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Paper,
  Slide,
  Divider,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { applyDoctorSchema } from "../ApplyDoctor/components/validationSchema";
import UserProfile from "./components/userProfile";
import OverlayLoader from "../../components/Spinner/OverlayLoader";
import { Heading, SubHeading } from "../../components/Heading";
import ToastAlert from "../../components/ToastAlert/ToastAlert";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import PrimaryPhoneInput from "../../components/PhoneInput";

interface ProfileForm {
  prefix: string;
  fullName: string;
  phoneNumber: string;
  website: string;
  address: string;
  specialization: string;
  experience: string;
  feePerConsultation: string;
  fromTime: string | null;
  toTime: string | null;
}

const Profile = () => {
  const userId = useTypedSelector(selectedUserId);
  const isDoctor = useTypedSelector(userIsDoctor);

  const [formValues, setFormValues] = useState<ProfileForm>({
    prefix: "",
    fullName: "",
    phoneNumber: "",
    website: "",
    address: "",
    specialization: "",
    experience: "",
    feePerConsultation: "",
    fromTime: null,
    toTime: null,
  });
  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  const {
    data,
    isLoading,
    isSuccess,
    refetch: refetchUser,
  } = useGetDoctorQuery({
    userId,
  });

  useEffect(() => {
    if (isSuccess) {
      setFormValues({
        prefix: data?.data?.prefix,
        fullName: data?.data?.fullName,
        phoneNumber: data?.data?.phoneNumber,
        website: data?.data?.website,
        address: data?.data?.address,
        specialization: data?.data?.specialization,
        experience: data?.data?.experience,
        feePerConsultation: data?.data?.feePerConsultation,
        fromTime: data?.data?.fromTime,
        toTime: data?.data?.toTime,
      });
    }
  }, [data, isSuccess]);

  const [updateProfile, { isLoading: profileLoading }] =
    useUpdateDoctorMutation({});

  const profileHandler = async (data: ProfileForm) => {
    try {
      const payload = { ...data };
      const response: any = await updateProfile({ userId, body: payload });

      if (response?.data?.status) {
        refetchUser();
        setToast({
          message: "Profile updated successfully",
          appearence: true,
          type: "success",
        });
      } else if (response?.error) {
        setToast({
          message: response?.error?.data?.message,
          appearence: true,
          type: "error",
        });
      }
    } catch (error) {
      setToast({
        message: "Something went wrong",
        appearence: true,
        type: "error",
      });
    }
  };

  if (!isDoctor) return <UserProfile />;

  return (
    <>
      {isLoading && <OverlayLoader />}
      <Box sx={{ p: 2 }}>
        <Heading>Profile</Heading>
        <Slide direction="up" in mountOnEnter unmountOnExit>
          <Paper
            elevation={4}
            sx={{
              p: 4,
              mt: 3,
              borderRadius: 3,
              background: "#fefefe",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            }}
          >
            <Formik
              initialValues={formValues}
              onSubmit={profileHandler}
              validationSchema={applyDoctorSchema}
              enableReinitialize
            >
              {(props: FormikProps<ProfileForm>) => {
                const {
                  values,
                  touched,
                  errors,
                  handleBlur,
                  handleChange,
                  setFieldValue,
                } = props;

                return (
                  <Form onKeyDown={onKeyDown}>
                    <SubHeading sx={{ mb: 2 }}>Basic Information</SubHeading>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <PrimaryInput
                          name="prefix"
                          placeholder="Prefix"
                          value={values.prefix}
                          readOnly
                          helperText={
                            touched.prefix && errors.prefix ? errors.prefix : ""
                          }
                          error={touched.prefix && Boolean(errors.prefix)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <PrimaryInput
                          name="fullName"
                          placeholder="Full Name"
                          value={values.fullName}
                          readOnly
                          sx={{ cursor: "not-allowed" }}
                          helperText={
                            touched.fullName && errors.fullName
                              ? errors.fullName
                              : ""
                          }
                          error={touched.fullName && Boolean(errors.fullName)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <PrimaryPhoneInput
                          value={values.phoneNumber}
                          name="phoneNumber"
                          formik={props}
                          label=""
                          readOnly
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <PrimaryInput
                          name="website"
                          placeholder="Website"
                          value={values.website}
                          helperText={
                            touched.website && errors.website ? errors.website : ""
                          }
                          error={touched.website && Boolean(errors.website)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <PrimaryInput
                          name="address"
                          placeholder="Address"
                          value={values.address}
                          helperText={
                            touched.address && errors.address ? errors.address : ""
                          }
                          error={touched.address && Boolean(errors.address)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 4 }} />

                    <SubHeading sx={{ mb: 2 }}>Professional Information</SubHeading>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <PrimaryInput
                          name="specialization"
                          placeholder="Specialization"
                          value={values.specialization}
                          helperText={
                            touched.specialization && errors.specialization
                              ? errors.specialization
                              : ""
                          }
                          error={
                            touched.specialization && Boolean(errors.specialization)
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <PrimaryInput
                          name="experience"
                          placeholder="Experience (years)"
                          value={values.experience}
                          type="number"
                          helperText={
                            touched.experience && errors.experience
                              ? errors.experience
                              : ""
                          }
                          error={touched.experience && Boolean(errors.experience)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <PrimaryInput
                          name="feePerConsultation"
                          placeholder="Fee Per Consultation"
                          value={values.feePerConsultation}
                          type="number"
                          helperText={
                            touched.feePerConsultation && errors.feePerConsultation
                              ? errors.feePerConsultation
                              : ""
                          }
                          error={
                            touched.feePerConsultation &&
                            Boolean(errors.feePerConsultation)
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <TimePicker
                            label="Start Time"
                            value={values.fromTime}
                            onChange={(value) => setFieldValue("fromTime", value)}
                            renderInput={(params) => <TextField fullWidth {...params} />}
                          />
                          {errors.fromTime && touched.fromTime && (
                            <Box sx={{ color: "#d32f2f", fontSize: "0.7rem", mt: 1 }}>
                              {errors.fromTime}
                            </Box>
                          )}
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <TimePicker
                            label="End Time"
                            value={values.toTime}
                            onChange={(value) => setFieldValue("toTime", value)}
                            renderInput={(params) => <TextField fullWidth {...params} />}
                          />
                          {errors.toTime && touched.toTime && (
                            <Box sx={{ color: "#d32f2f", fontSize: "0.7rem", mt: 1 }}>
                              {errors.toTime}
                            </Box>
                          )}
                        </LocalizationProvider>
                      </Grid>
                    </Grid>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={profileLoading}
                        sx={{ px: 4, py: 1.5, borderRadius: 2 }}
                      >
                        {profileLoading ? "Updating..." : "Update"}
                      </Button>
                    </Box>
                  </Form>
                );
              }}
            </Formik>
          </Paper>
        </Slide>
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

export default Profile;
