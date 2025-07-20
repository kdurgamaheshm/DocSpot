// Hooks
import useTypedSelector from "../../../hooks/useTypedSelector";
// Redux
import { useGetUserQuery } from "../../../redux/api/userSlice";
import {
  selectedUserId,
  userIsAdmin,
  userIsDoctor,
} from "../../../redux/auth/authSlice";
// Utils
import {
  formatDateTime,
  getNameInitials,
  maskingPhoneNumber,
} from "../../../utils";
// MUI Imports
import { Box, Avatar } from "@mui/material";
// Custom Imports
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import { Heading } from "../../../components/Heading";

const UserProfile = () => {
  const userId = useTypedSelector(selectedUserId);
  const isDoctor = useTypedSelector(userIsDoctor);
  const isAdmin = useTypedSelector(userIsAdmin);

  const { data, isLoading } = useGetUserQuery({
    userId,
  });

  return (
    <>
      {isLoading && <OverlayLoader />}
      <Heading>Profile Details</Heading>
      <Box
        sx={{
          margin: "20px 0",
          background: "#f8f9fa",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          maxWidth: "380px",
          border: "1px solid #d9d9d9",
          transition: "all 0.3s ease-in-out",
          ":hover": {
            boxShadow: "0px 6px 16px rgba(0,0,0,0.15)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "14px",
            fontWeight: 500,
            color: "#333",
          }}
        >
          {isDoctor ? "Doctor" : isAdmin ? "Owner" : "User"}
          {isAdmin && (
            <Box
              sx={{
                background: "#0078a5",
                fontSize: "11px",
                color: "#fff",
                borderRadius: "12px",
                padding: "4px 10px",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Admin
            </Box>
          )}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: "#0078a5",
              fontWeight: 600,
              fontSize: "20px",
            }}
          >
            {getNameInitials(data?.data?.name)}
          </Avatar>
        </Box>

        <Heading
          sx={{
            textAlign: "center",
            color: "#1a1a1a",
            fontSize: "20px",
            fontWeight: 700,
            mb: 1,
          }}
        >
          {data?.data?.name}
        </Heading>
        <Box
          sx={{
            textAlign: "center",
            fontSize: "14px",
            color: "#666",
            mb: 2,
          }}
        >
          {maskingPhoneNumber(data?.data?.phoneNumber)}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "13px",
            color: "#444",
            mt: 2,
          }}
        >
          <Box sx={{ fontWeight: 500 }}>Created At:</Box>
          <Box>{formatDateTime(data?.data?.createdAt)}</Box>
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;
