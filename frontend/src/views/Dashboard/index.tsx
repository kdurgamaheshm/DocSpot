import { useNavigate } from "react-router-dom";
// Utils
import {
  convertToAMPMFormat,
  maskingPhoneNumber,
  thousandSeparatorNumber,
} from "../../utils";
// React Icons
import { IoPhonePortraitOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { CiMoneyCheck1 } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
// MUI Imports
import { Box, Grid, Divider } from "@mui/material";
// Custom Imports
import { Heading } from "../../components/Heading";
import { useGetApprovedDoctorsQuery } from "../../redux/api/doctorSlice";
import OverlayLoader from "../../components/Spinner/OverlayLoader";
import AdminGraphAnalysis from "../../components/AdminGraphAnalysis";
import useTypedSelector from "../../hooks/useTypedSelector";
import { userIsAdmin } from "../../redux/auth/authSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetApprovedDoctorsQuery({});
  const isAdmin = useTypedSelector(userIsAdmin);

  return (
    <>
      {isLoading && <OverlayLoader />}
      <Heading>Available Doctors</Heading>
      {data?.data?.length !== 0 && (
        <Heading sx={{ margin: "10px 0", fontSize: "14px", fontWeight: 500 }}>
          Select Doctor to add Appointments
        </Heading>
      )}

      <Box sx={{ backgroundColor: "#F4F6F9", padding: "20px", borderRadius: "8px" }}>
        <Grid container rowSpacing={2} columnSpacing={4}>
          {data?.data?.length === 0 ? (
            <Box
              sx={{
                margin: "30px 0 20px 0",
                background: "#ffffff",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                color: "#555",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              }}
            >
              No Doctors Available in this Clinic
            </Box>
          ) : (
            <>
              {data?.data?.map((row: any, index: number) => (
                <Grid item xs={12} sm={6} md={5.6} key={index}>
                  <Box
                    sx={{
                      background: "linear-gradient(to right, #dfe9f3 0%, white 100%)",
                      borderRadius: "10px",
                      padding: "20px",
                      transition: "0.3s",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                      cursor: "pointer",
                      "&:hover": {
                        border: "2px solid #007D9C",
                        boxShadow: "0 6px 14px rgba(0, 125, 156, 0.15)",
                      },
                    }}
                    onClick={() => {
                      navigate(`/book-appointments/${row?.userId}`);
                    }}
                  >
                    <Heading
                      sx={{
                        fontSize: "18px",
                        marginBottom: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontWeight: 600,
                      }}
                    >
                      {`${row?.prefix} ${row?.fullName}`}
                      <Box sx={{ fontSize: "14px", color: "#777" }}>
                        ({row?.specialization})
                      </Box>
                    </Heading>
                    <Divider sx={{ mb: 2 }} />

                    {/* Phone */}
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Box
                        sx={{
                          minWidth: "160px",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          fontWeight: 500,
                        }}
                      >
                        <IoPhonePortraitOutline /> Phone Number
                      </Box>
                      <Box sx={{ color: "#444" }}>
                        {maskingPhoneNumber(row?.phoneNumber)}
                      </Box>
                    </Box>

                    {/* Address */}
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Box
                        sx={{
                          minWidth: "160px",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          fontWeight: 500,
                        }}
                      >
                        <CiLocationOn /> Address
                      </Box>
                      <Box sx={{ color: "#444" }}>{row?.address}</Box>
                    </Box>

                    {/* Fee */}
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Box
                        sx={{
                          minWidth: "160px",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          fontWeight: 500,
                        }}
                      >
                        <CiMoneyCheck1 /> Fee Per Visit
                      </Box>
                      <Box sx={{ color: "#444" }}>
                        {thousandSeparatorNumber(row?.feePerConsultation)}
                      </Box>
                    </Box>

                    {/* Timings */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          minWidth: "160px",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          fontWeight: 500,
                        }}
                      >
                        <IoMdTime /> Timings
                      </Box>
                      <Box sx={{ color: "#444" }}>
                        {`${convertToAMPMFormat(row?.fromTime)} to ${convertToAMPMFormat(row?.toTime)}`}
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Box>
      
      {isAdmin && <AdminGraphAnalysis />}
    </>
  );
};

export default Dashboard;

