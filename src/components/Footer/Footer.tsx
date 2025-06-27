import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Footer = () => {
  return (
    <>
      <Box
        component="footer"
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 2,
          width: "100%",
          position: "fixed",
          bottom: 0,
          left: 0,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            maxWidth: "lg",
            width: "100%",
            mx: "auto",
            px: 2,
            minHeight: "unset !important",
          }}
        >
          <Typography variant="body2" align="center" sx={{ width: "100%" }}>
            © {new Date().getFullYear()} Recipe App. All rights reserved.
          </Typography>
        </Toolbar>
      </Box>
    </>
  );
};

export default Footer;
