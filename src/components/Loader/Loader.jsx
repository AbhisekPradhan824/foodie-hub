import React from "react";
import { Box, Typography } from "@mui/material";
import "./Loader.css";

const Loader = () => {
  return (
    <Box className="loader-container">
      <Box className="loader-content">
        <div className="food-loader">
          <div className="plate"></div>
          <div className="food">
            <div className="burger-top"></div>
            <div className="burger-lettuce"></div>
            <div className="burger-patty"></div>
            <div className="burger-bottom"></div>
          </div>
        </div>
        <Typography variant="h4" className="loader-title">
          🍔 Foodie Hub
        </Typography>
        <Typography variant="body1" className="loader-text">
          Preparing delicious experience...
        </Typography>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </Box>
    </Box>
  );
};

export default Loader;
