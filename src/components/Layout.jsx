import React from "react";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          minHeight: "100vh",
          maxWidth: "100vw",
          flexGrow: 1,
        }}
      >
        <Navbar />
        {children}
        <Footer />
      </Box>
    </>
  );
};
