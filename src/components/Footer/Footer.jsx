import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box className="footer-brand">
              <Typography variant="h4" className="footer-logo">
                🍔 Foodie Hub
              </Typography>
              <Typography variant="body2" className="footer-description">
                Experience the authentic flavors of India delivered right to
                your doorstep. Fresh ingredients, traditional recipes, and a
                passion for great food.
              </Typography>
              <Box className="social-links">
                <IconButton className="social-btn facebook">
                  <Facebook />
                </IconButton>
                <IconButton className="social-btn twitter">
                  <Twitter />
                </IconButton>
                <IconButton className="social-btn instagram">
                  <Instagram />
                </IconButton>
                <IconButton className="social-btn youtube">
                  <YouTube />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" className="footer-title">
              Quick Links
            </Typography>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/menu">Menu</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </Grid>

          {/* Categories */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" className="footer-title">
              Categories
            </Typography>
            <ul className="footer-links">
              <li>
                <Link to="/menu">North Indian</Link>
              </li>
              <li>
                <Link to="/menu">South Indian</Link>
              </li>
              <li>
                <Link to="/menu">Street Food</Link>
              </li>
              <li>
                <Link to="/menu">Desserts</Link>
              </li>
            </ul>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="footer-title">
              Contact Us
            </Typography>
            <Box className="contact-info">
              <Box className="contact-item">
                <LocationOn className="contact-icon" />
                <Typography variant="body2">
                  123 Food Street, Mumbai, Maharashtra 400001
                </Typography>
              </Box>
              <Box className="contact-item">
                <Phone className="contact-icon" />
                <Typography variant="body2">+91 98765 43210</Typography>
              </Box>
              <Box className="contact-item">
                <Email className="contact-icon" />
                <Typography variant="body2">hello@foodiehub.in</Typography>
              </Box>
            </Box>

            {/* Newsletter */}
            <Box className="newsletter">
              <Typography variant="body2" className="newsletter-title">
                Subscribe to our newsletter
              </Typography>
              <Box className="newsletter-form">
                <TextField
                  placeholder="Enter your email"
                  size="small"
                  className="newsletter-input"
                />
                <Button variant="contained" className="newsletter-btn">
                  Subscribe
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box className="footer-bottom">
          <Typography variant="body2">
            © {new Date().getFullYear()} Foodie Hub. All rights reserved.
          </Typography>
          <Box className="footer-bottom-links">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
            <Link to="#">Refund Policy</Link>
          </Box>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
