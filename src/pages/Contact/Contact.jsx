import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import {
  Phone,
  Email,
  LocationOn,
  AccessTime,
  Send,
  WhatsApp,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "./Contact.css";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: <Phone />,
      title: "Phone",
      content: "+91 98765 43210",
      subContent: "+91 98765 43211",
    },
    {
      icon: <Email />,
      title: "Email",
      content: "hello@foodiehub.in",
      subContent: "support@foodiehub.in",
    },
    {
      icon: <LocationOn />,
      title: "Address",
      content: "123 Food Street, Andheri West",
      subContent: "Mumbai, Maharashtra 400058",
    },
    {
      icon: <AccessTime />,
      title: "Working Hours",
      content: "Mon - Sun: 10:00 AM - 11:00 PM",
      subContent: "Delivery available till 10:30 PM",
    },
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().matches(/^[6-9]\d{9}$/, "Invalid phone number"),
      subject: Yup.string().required("Subject is required"),
      message: Yup.string()
        .required("Message is required")
        .min(10, "Message too short"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Message sent successfully! We'll get back to you soon.");
      resetForm();
      setIsSubmitting(false);
    },
  });

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <Box className="contact-hero">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h2" className="contact-title">
              Get In <span className="gradient-text">Touch</span>
            </Typography>
            <Typography variant="h6" className="contact-subtitle">
              Have questions? We'd love to hear from you!
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" className="contact-container">
        <Grid container spacing={4}>
          {/* Contact Info Cards */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography variant="h5" className="info-title">
                Contact Information
              </Typography>
              <Typography variant="body2" className="info-subtitle">
                Reach out to us through any of these channels
              </Typography>

              <Box className="contact-cards">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="contact-info-card">
                      <CardContent>
                        <Box className="info-icon">{info.icon}</Box>
                        <Box className="info-content">
                          <Typography
                            variant="subtitle2"
                            className="info-label"
                          >
                            {info.title}
                          </Typography>
                          <Typography variant="body2">
                            {info.content}
                          </Typography>
                          <Typography variant="caption">
                            {info.subContent}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Box>

              {/* WhatsApp Button */}
              <Button
                variant="contained"
                startIcon={<WhatsApp />}
                className="whatsapp-btn"
                href="https://wa.me/919876543210"
                target="_blank"
              >
                Chat on WhatsApp
              </Button>
            </motion.div>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Paper className="contact-form-paper">
                <Typography variant="h5" className="form-title">
                  Send us a Message
                </Typography>
                <Typography variant="body2" className="form-subtitle">
                  Fill out the form below and we'll get back to you within 24
                  hours
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="name"
                        label="Your Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.name && Boolean(formik.errors.name)
                        }
                        helperText={formik.touched.name && formik.errors.name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="email"
                        label="Email Address"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="phone"
                        label="Phone Number"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.phone && Boolean(formik.errors.phone)
                        }
                        helperText={formik.touched.phone && formik.errors.phone}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="subject"
                        label="Subject"
                        value={formik.values.subject}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.subject &&
                          Boolean(formik.errors.subject)
                        }
                        helperText={
                          formik.touched.subject && formik.errors.subject
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={5}
                        name="message"
                        label="Your Message"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.message &&
                          Boolean(formik.errors.message)
                        }
                        helperText={
                          formik.touched.message && formik.errors.message
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        className="submit-btn"
                        disabled={isSubmitting}
                        endIcon={<Send />}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        {/* Map Section */}
        <Box className="map-section">
          <Typography variant="h5" className="map-title">
            Find Us Here
          </Typography>
          <Paper className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Location Map"
            ></iframe>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default Contact;
