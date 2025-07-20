import "react-phone-input-2/lib/material.css";
import MuiPhoneNumber from "material-ui-phone-number";
import { removeDashAndSpace } from "../../utils";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";

interface PhoneNumberProps {
  value: string;
  name: string;
  onChange?: any;
  onBlur?: any; // ✅ Added here
  countryCode?: string;
  variant?: "standard" | "outlined" | "filled";
  label?: string;
  formik?: any;
  authScreens?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  showErrorMessage?: boolean;
}

const PrimaryPhoneInput = ({
                             value,
                             name,
                             onChange,
                             onBlur, // ✅ Added here
                             countryCode,
                             variant,
                             label,
                             formik,
                             authScreens,
                             disabled,
                             readOnly,
                             showErrorMessage,
                           }: PhoneNumberProps) => {
  const [defaultCountry, setDefaultCountry] = useState<any>("");
  const [loader, setLoader] = useState(false);

  const options = {
    method: "GET",
    url: "https://geolocation-db.com/json/67273a00-5c4b-11ed-9204-d161c2da74ce",
  };

  const getCountry = async () => {
    try {
      setLoader(true);
      const response = await axios.request(options);
      if (response?.data?.country_code !== "Not found") {
        setDefaultCountry(response?.data?.country_code.toLowerCase());
      } else {
        setDefaultCountry("pk");
      }
    } catch (error) {
      console.warn(error);
      setDefaultCountry("pk");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (authScreens) {
      getCountry();
    }
  }, []);

  return (
      <Box
          sx={{
            width: "100%",
            animation: "fadeIn 0.6s ease-in-out",
            "@keyframes fadeIn": {
              from: { opacity: 0, transform: "translateY(10px)" },
              to: { opacity: 1, transform: "translateY(0px)" },
            },
          }}
      >
        {label && (
            <Typography
                variant="body2"
                fontWeight="bold"
                mb={0.5}
                color="#388e3c"
            >
              {label}
            </Typography>
        )}

        <MuiPhoneNumber
            sx={{
              width: "100% !important",
              background: "#f7fdf8",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                height: "50px !important",
                border: "1.5px solid #d0e8d0",
                borderRadius: "8px",
                boxShadow: "0 0 4px rgba(56, 142, 60, 0.2)",
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "#66bb6a",
                  boxShadow: "0 0 6px rgba(56, 142, 60, 0.4)",
                },
              },
              "& .MuiFormHelperText-root.Mui-error": {
                margin: "4px 0 0",
              },
            }}
            defaultCountry={
              countryCode ? countryCode.toLowerCase() : defaultCountry || "pk"
            }
            onChange={(e: any) => {
              onChange
                  ? onChange(e)
                  : formik?.setFieldValue(name, removeDashAndSpace(e));
            }}
            name={name}
            value={value}
            variant={variant || "outlined"}
            label=""
            error={formik?.touched[name] && Boolean(formik?.errors[name])}
            helperText={
              showErrorMessage ? "" : formik?.touched[name] && formik?.errors[name]
            }
            onBlur={onBlur || formik?.handleBlur} // ✅ FIXED here
            disabled={disabled}
            disableDropdown={loader || disabled}
            inputProps={{
              readOnly: readOnly,
              style: {
                cursor: readOnly ? "not-allowed" : "text",
                backgroundColor: readOnly ? "#f0f0f0" : "white",
                borderRadius: "8px",
              },
            }}
        />
      </Box>
  );
};

export default PrimaryPhoneInput;
