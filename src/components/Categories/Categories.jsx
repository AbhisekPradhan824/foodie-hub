import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { categoryData } from "../../data/categoryData";
import "./Categories.css";

const Categories = () => {
  return (
    <section className="categories-section">
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography variant="h3" className="section-title">
            Explore <span className="gradient-text">Categories</span>
          </Typography>
          <Typography variant="body1" className="section-subtitle">
            Discover a variety of cuisines to satisfy your cravings
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          {categoryData.map((category, index) => (
            <Grid item xs={6} sm={4} md={2} key={category.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Box
                  className="category-card"
                  style={{ "--card-color": category.color }}
                >
                  <Box className="category-image-wrapper">
                    <img src={category.image} alt={category.name} />
                  </Box>
                  <Typography variant="h6" className="category-name">
                    {category.name}
                  </Typography>
                  <Typography variant="caption" className="category-count">
                    {category.itemCount} items
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default Categories;
