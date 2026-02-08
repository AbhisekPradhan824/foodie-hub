import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import { Restaurant, LocalShipping, Star } from "@mui/icons-material";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: <Restaurant />, value: "500+", label: "Dishes" },
    { icon: <LocalShipping />, value: "30 min", label: "Delivery" },
    { icon: <Star />, value: "4.8", label: "Rating" },
  ];

  return (
    <section className="hero">
      <Container maxWidth="lg">
        <Box className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <Typography variant="h1" className="hero-title">
              Delicious <span className="highlight">Indian</span> Food
              <br />
              Delivered To Your <span className="highlight">Doorstep</span>
            </Typography>
            <Typography variant="h6" className="hero-subtitle">
              Experience the authentic taste of India with our handcrafted
              dishes made from fresh ingredients and traditional recipes.
            </Typography>
            <Box className="hero-buttons">
              <Button
                variant="contained"
                className="btn-order"
                onClick={() => navigate("/menu")}
              >
                Order Now
              </Button>
              <Button
                variant="outlined"
                className="btn-explore"
                onClick={() => navigate("/menu")}
              >
                Explore Menu
              </Button>
            </Box>
            <Box className="hero-stats">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                  className="stat-item"
                >
                  <Box className="stat-icon">{stat.icon}</Box>
                  <Typography variant="h5" className="stat-value">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" className="stat-label">
                    {stat.label}
                  </Typography>
                </motion.div>
              ))}
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hero-image"
          >
            <div className="image-container">
              <img
                src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600"
                alt="Indian Food"
                className="main-image"
              />
              <div className="floating-card card-1">
                <img
                  src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=100"
                  alt="Butter Chicken"
                />
                <div className="card-content">
                  <Typography variant="body2">Butter Chicken</Typography>
                  <Typography variant="caption" className="price">
                    ₹350
                  </Typography>
                </div>
              </div>
              <div className="floating-card card-2">
                <img
                  src="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=100"
                  alt="Paneer Tikka"
                />
                <div className="card-content">
                  <Typography variant="body2">Paneer Tikka</Typography>
                  <Typography variant="caption" className="price">
                    ₹280
                  </Typography>
                </div>
              </div>
              <div className="discount-badge">
                <Typography variant="h6">20%</Typography>
                <Typography variant="caption">OFF</Typography>
              </div>
            </div>
          </motion.div>
        </Box>
      </Container>

      {/* Decorative Elements */}
      <div className="hero-decoration">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
    </section>
  );
};

export default Hero;
