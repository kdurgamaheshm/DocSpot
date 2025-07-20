import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#045D56", // ServiceNow primary green
    color: "#FFFFFF",
    fontWeight: 600,
    textTransform: "uppercase",
    fontSize: "14px",
    letterSpacing: "0.5px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#333",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#F9F9F9",
  transition: "background-color 0.2s ease-in-out",
  "&:nth-of-type(odd)": {
    backgroundColor: "#F4FBF9", // light green tint for zebra stripe
  },
  "&:hover": {
    backgroundColor: "#E0F2EF", // soft hover green
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface MUITableProps {
  tableHead: string[];
  children: React.ReactNode;
}

const MUITable: React.FC<MUITableProps> = ({ tableHead, children }) => {
  return (
      <TableContainer
          component={Paper}
          elevation={3}
          sx={{
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.05)",
          }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {tableHead.map((header, index) => (
                  <StyledTableCell align="left" key={index}>
                    {header}
                  </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
  );
};

export default MUITable;
