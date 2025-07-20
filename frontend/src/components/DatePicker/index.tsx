import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material";

type DatePickerProps = {
  name?: string;
  value: string | Date | null | undefined;
  handleChange: (date: any) => void;
  label?: string;
  minDate?: Date | null;
  maxDate?: Date | null;
  inputFormat?: string;
  openTo?: "day" | "year" | "month";
  views?: Array<"day" | "year" | "month">;
  disabled?: boolean;
  formik?: any;
  variant?: "standard" | "filled" | "outlined";
};

export default function DatePicker({
                                     name,
                                     value,
                                     handleChange,
                                     label,
                                     minDate,
                                     maxDate,
                                     openTo,
                                     views,
                                     disabled,
                                     formik,
                                     variant,
                                   }: DatePickerProps) {
  const theme = useTheme();

  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack sx={{ width: "100%" }}>
          <DesktopDatePicker
              label={label}
              openTo={openTo}
              views={views ?? ["day"]}
              inputFormat={"DD/MM/YYYY"}
              disabled={disabled}
              minDate={minDate ?? new Date("1900-01-01T00:00:00.000Z")}
              maxDate={maxDate ?? new Date("2100-01-01T00:00:00.000Z")}
              value={value}
              onChange={handleChange}
              className={
                formik?.touched?.[name as string] && formik?.errors?.[name as string]
                    ? "error"
                    : ""
              }
              InputProps={{
                sx: {
                  borderRadius: "10px",
                  height: "50px",
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  transition: "all 0.3s ease-in-out",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    boxShadow: `0 2px 6px ${alpha(theme.palette.primary.main, 0.2)}`,
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    padding: "12px 14px",
                    fontWeight: 500,
                    color: "#333",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    textTransform: "uppercase",
                    opacity: 0.5,
                  },
                },
              }}
              renderInput={(params) => (
                  <TextField
                      {...params}
                      name={name}
                      fullWidth
                      variant={variant ?? "outlined"}
                      error={Boolean(
                          formik?.touched?.[name as string] && formik?.errors?.[name as string]
                      )}
                      helperText={
                        formik?.touched?.[name as string] && formik?.errors?.[name as string]
                            ? formik.errors[name as string]
                            : ""
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: alpha(theme.palette.primary.main, 0.3),
                          },
                          "&:hover fieldset": {
                            borderColor: theme.palette.primary.main,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: theme.palette.primary.main,
                            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
                          },
                        },
                      }}
                  />
              )}
          />
        </Stack>
      </LocalizationProvider>
  );
}
