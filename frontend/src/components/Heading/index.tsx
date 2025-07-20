// React Imports
import * as React from "react";
// MUI Imports
import { Box } from "@mui/material";
import { SxProps } from "@mui/system";
import { motion, easeOut } from "framer-motion";

const root = {
  fontSize: "25px",
  fontWeight: "700",
  whiteSpace: "wrap !important",
  color: "#0ed874", // Primary ServiceNow green
  transition: "all 0.3s ease-in-out",

  "@media screen and (max-width: 425px)": {
    fontSize: "18px",
  },
  "@media screen and (max-width: 375px)": {
    fontSize: "16px",
  },
};

const subRoot = {
  fontSize: "15px",
  fontWeight: "500",
  whiteSpace: "wrap !important",
  color: "#0ed874",
  transition: "all 0.3s ease-in-out",

  "@media screen and (max-width: 425px)": {
    fontSize: "13px",
  },
  "@media screen and (max-width: 320px)": {
    fontSize: "12px",
  },
};

interface HeadingProps {
  children?: React.ReactNode;
  sx?: SxProps;
}

// Animation settings
const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

export const Heading = (props: HeadingProps) => {
  const styles: any = props.sx;
  return (
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <Box sx={{ ...root, ...styles }}>{props.children}</Box>
      </motion.div>
  );
};

export const SubHeading = (props: HeadingProps) => {
  const styles: any = props.sx;
  return (
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <Box sx={{ ...subRoot, ...styles }}>{props.children}</Box>
      </motion.div>
  );
};
