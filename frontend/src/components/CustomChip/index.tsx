import { Box, Chip } from "@mui/material";

type Props = {
  label: string;
};

const CustomChip = ({ label }: Props) => {
  const convertColorToRgb = (color: string) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, 0.15)`;
  };

  const getChipData = (status: string) => {
    let color: string;
    let bgColor: string;

    switch (status) {
      case "Doctor":
        color = "#4bade8";
        bgColor = convertColorToRgb(color);
        break;
      case "Admin":
      case "Owner":
        color = "#f5a623";
        bgColor = convertColorToRgb(color);
        break;
      case "Pending":
        color = "#348BAD";
        bgColor = convertColorToRgb(color);
        break;
      case "Approved":
      case "User":
        color = "#13B981";
        bgColor = "#E7F8F2";
        break;
      case "Cancelled":
        color = "#c21717";
        bgColor = convertColorToRgb(color);
        break;
      case "Blocked":
        color = "#FF8554";
        bgColor = convertColorToRgb(color);
        break;
      default:
        color = `#292929`;
        bgColor = "#dcdee4";
        break;
    }

    return { color, bgColor };
  };

  const chipData = getChipData(label);

  return (
      <Box
          sx={{
            maxWidth: "120px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "20px",
            backgroundColor: chipData.bgColor,
            border: `1px solid ${chipData.color}`,
            padding: "4px 12px",
            transition: "all 0.3s ease-in-out",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            height: "32px",
          }}
      >
        <Chip
            label={label}
            variant="outlined"
            sx={{
              border: "none",
              color: chipData.color,
              fontWeight: 600,
              fontSize: "12px",
              padding: 0,
              background: "transparent",
            }}
        />
      </Box>
  );
};

export default CustomChip;
