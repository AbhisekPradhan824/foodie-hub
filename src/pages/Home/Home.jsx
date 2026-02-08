import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  LocalShipping,
  Restaurant,
  Timer,
  Star,
  ArrowForward,
} from "@mui/icons-material";
import Hero from "../../components/Hero/Hero";
import Categories from "../../components/Categories/Categories";
import FoodCard from "../../components/FoodCard/FoodCard";
import { foodItems } from "../../data/foodData";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const bestsellers = foodItems.filter((item) => item.isBestseller).slice(0, 4);
  const popularItems = foodItems.slice(0, 8);

  const features = [
    {
      icon: <Restaurant />,
      title: "Fresh Ingredients",
      description:
        "We use only the freshest ingredients sourced from local farms",
      color: "#FF6B35",
    },
    {
      icon: <Timer />,
      title: "Quick Delivery",
      description: "Get your food delivered within 30 minutes or less",
      color: "#2EC4B6",
    },
    {
      icon: <LocalShipping />,
      title: "Free Delivery",
      description: "Free delivery on orders above ₹499",
      color: "#F7931E",
    },
    {
      icon: <Star />,
      title: "Best Quality",
      description: "Authentic recipes prepared by expert chefs",
      color: "#9B59B6",
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <Categories />

      {/* Bestsellers Section */}
      <section className="bestsellers-section">
        <Container maxWidth="lg">
          <Box className="section-header">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Typography variant="h3" className="section-title">
                Our <span className="gradient-text">Bestsellers</span>
              </Typography>
              <Typography variant="body1" className="section-subtitle">
                Most loved dishes by our customers
              </Typography>
            </motion.div>
            <Button
              endIcon={<ArrowForward />}
              className="view-all-btn"
              onClick={() => navigate("/menu")}
            >
              View All
            </Button>
          </Box>

          <Grid container spacing={3}>
            {bestsellers.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <FoodCard item={item} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" className="section-title">
              Why Choose <span className="gradient-text">Foodie Hub?</span>
            </Typography>
            <Typography variant="body1" className="section-subtitle">
              We deliver happiness with every order
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="feature-card">
                    <CardContent>
                      <Box
                        className="feature-icon"
                        style={{ background: feature.color }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" className="feature-title">
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="feature-description"
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Popular Items Section */}
      <section className="popular-section">
        <Container maxWidth="lg">
          <Box className="section-header">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Typography variant="h3" className="section-title">
                Popular <span className="gradient-text">Dishes</span>
              </Typography>
              <Typography variant="body1" className="section-subtitle">
                Explore our most popular menu items
              </Typography>
            </motion.div>
            <Button
              endIcon={<ArrowForward />}
              className="view-all-btn"
              onClick={() => navigate("/menu")}
            >
              View All
            </Button>
          </Box>

          <Grid container spacing={3}>
            {popularItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <FoodCard item={item} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="cta-content"
          >
            <Typography variant="h3" className="cta-title">
              Hungry? Order Now!
            </Typography>
            <Typography variant="body1" className="cta-subtitle">
              Get 20% off on your first order. Use code: FOODIE20
            </Typography>
            <Box className="cta-buttons">
              <Button
                variant="contained"
                className="cta-btn-primary"
                onClick={() => navigate("/menu")}
              >
                Order Now
              </Button>
              <Button
                variant="outlined"
                className="cta-btn-secondary"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </Button>
            </Box>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
