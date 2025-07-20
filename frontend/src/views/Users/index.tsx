import {
  Box,
  Tooltip,
  Paper,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { Heading } from "../../components/Heading";
import MUITable, {
  StyledTableCell,
  StyledTableRow,
} from "../../components/MUITable";
import OverlayLoader from "../../components/Spinner/OverlayLoader";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../redux/api/userSlice";
import { formatDateTime } from "../../utils";
import CustomChip from "../../components/CustomChip";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import ToastAlert from "../../components/ToastAlert/ToastAlert";
import Spinner from "../../components/Spinner";

const tableHead = ["Name", "Email", "Date", "Roles", "Actions"];

const Users = () => {
  const [userId, setUserId] = useState("");
  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const handleCloseToast = () =>
      setToast({ ...toast, appearence: false });

  const { data, isLoading, isSuccess } = useGetAllUsersQuery({});
  const [deleteUser, { isLoading: deleteLoading }] =
      useDeleteUserMutation();

  const DeleteHandler = async (id: string) => {
    try {
      const user: any = await deleteUser({ userId: id });

      if (user?.data === null) {
        setToast({
          ...toast,
          message: "User Deleted Successfully",
          appearence: true,
          type: "success",
        });
      }
    } catch (error) {
      console.error("Deleting User Error:", error);
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
        {isLoading && <OverlayLoader />}
        <Box
            sx={{
              mt: 3,
              mb: 2,
              px: 3,
              py: 2,
              bgcolor: "#fff",
              borderRadius: "12px",
              boxShadow: 3,
            }}
        >
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Users Management
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <MUITable tableHead={tableHead}>
            {isSuccess &&
                data.data.map((row: any) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell>{row?.name}</StyledTableCell>
                      <StyledTableCell>{row.email}</StyledTableCell>
                      <StyledTableCell>
                        {formatDateTime(row.createdAt)}
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomChip
                            label={
                              row?.isAdmin
                                  ? "Owner"
                                  : row?.isDoctor
                                      ? "Doctor"
                                      : "User"
                            }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        {userId === row.id && deleteLoading ? (
                            <Spinner size={20} />
                        ) : (
                            !row?.isAdmin &&
                            !row?.isDoctor && (
                                <Tooltip title="Delete User" placement="top">
                                  <IconButton
                                      onClick={() => {
                                        DeleteHandler(row.id);
                                        setUserId(row.id);
                                      }}
                                      size="small"
                                      sx={{
                                        bgcolor: "#ffe6e6",
                                        color: "#d32f2f",
                                        ":hover": {
                                          bgcolor: "#ffcccc",
                                        },
                                      }}
                                  >
                                    <MdDeleteOutline />
                                  </IconButton>
                                </Tooltip>
                            )
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                ))}
          </MUITable>
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

export default Users;
