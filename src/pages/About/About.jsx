import React from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import {
  Restaurant,
  Favorite,
  EmojiEvents,
  Groups,
  LocalShipping,
  SupportAgent,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import "./About.css";

const About = () => {
  const stats = [
    { value: "50K+", label: "Happy Customers", icon: <Groups /> },
    { value: "500+", label: "Dishes Available", icon: <Restaurant /> },
    { value: "100+", label: "Expert Chefs", icon: <EmojiEvents /> },
    { value: "30 min", label: "Avg Delivery", icon: <LocalShipping /> },
  ];

  const values = [
    {
      icon: <Restaurant />,
      title: "Quality Food",
      description:
        "We use only the freshest ingredients sourced from local farms to ensure the best quality in every dish.",
    },
    {
      icon: <Favorite />,
      title: "Made with Love",
      description:
        "Every dish is prepared with passion and care by our expert chefs who treat each meal as a work of art.",
    },
    {
      icon: <LocalShipping />,
      title: "Fast Delivery",
      description:
        "Our efficient delivery system ensures your food arrives hot and fresh within 30 minutes.",
    },
    {
      icon: <SupportAgent />,
      title: "24/7 Support",
      description:
        "Our customer support team is always available to assist you with any queries or concerns.",
    },
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Head Chef",
      image:
        "https://images.unsplash.com/photo-1583394293214-28ez39b52c2c?w=200",
      description: "15+ years of culinary experience",
    },
    {
      name: "Priya Sharma",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
      description: "Passionate about Indian cuisine",
    },
    {
      name: "Amit Patel",
      role: "Operations Head",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
      description: "Expert in food logistics",
    },
    {
      name: "Sneha Reddy",
      role: "Marketing Director",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200",
      description: "Building our brand story",
    },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <Box className="about-hero">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h2" className="about-title">
              About <span className="gradient-text">Foodie Hub</span>
            </Typography>
            <Typography variant="h6" className="about-subtitle">
              Bringing the authentic flavors of India to your doorstep since
              2020
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box className="stats-section">
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Box className="stat-card">
                    <Box className="stat-icon">{stat.icon}</Box>
                    <Typography variant="h3" className="stat-value">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" className="stat-label">
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Story Section */}
      <Box className="story-section">
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Typography variant="h3" className="section-title">
                  Our <span className="gradient-text">Story</span>
                </Typography>
                <Typography variant="body1" className="story-text">
                  Foodie Hub was born out of a simple yet powerful idea - to
                  bring authentic Indian flavors to every home. What started as
                  a small kitchen in Mumbai has now grown into one of India's
                  most loved food delivery platforms.
                </Typography>
                <Typography variant="body1" className="story-text">
                  Our journey began in 2020 when our founder, Priya Sharma,
                  realized that many people were missing the taste of
                  home-cooked Indian food. With a team of passionate chefs and
                  food enthusiasts, we set out to create a platform that
                  delivers not just food, but memories and experiences.
                </Typography>
                <Typography variant="body1" className="story-text">
                  Today, we serve over 50,000 happy customers across 20+ cities
                  in India, and we're just getting started. Our commitment to
                  quality, authenticity, and customer satisfaction remains
                  unchanged.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Box className="story-image">
                  <img
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600"
                    alt="Our Kitchen"
                  />
                  <Box className="image-badge">
                    <Typography variant="h4">4+</Typography>
                    <Typography variant="caption">
                      Years of Excellence
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Values Section */}
      <Box className="values-section">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" className="section-title">
              Our <span className="gradient-text">Values</span>
            </Typography>
            <Typography variant="body1" className="section-subtitle">
              The principles that guide everything we do
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="value-card">
                    <CardContent>
                      <Box className="value-icon">{value.icon}</Box>
                      <Typography variant="h6" className="value-title">
                        {value.title}
                      </Typography>
                      <Typography variant="body2" className="value-description">
                        {value.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Box className="team-section">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" className="section-title">
              Meet Our <span className="gradient-text">Team</span>
            </Typography>
            <Typography variant="body1" className="section-subtitle">
              The passionate people behind Foodie Hub
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {team.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="team-card">
                    <CardContent>
                      <Avatar
                        src={member.image}
                        alt={member.name}
                        className="team-avatar"
                      />
                      <Typography variant="h6" className="team-name">
                        {member.name}
                      </Typography>
                      <Typography variant="body2" className="team-role">
                        {member.role}
                      </Typography>
                      <Typography
                        variant="caption"
                        className="team-description"
                      >
                        {member.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default About;
