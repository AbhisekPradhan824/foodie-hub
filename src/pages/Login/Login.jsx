import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { loginSuccess } from "../../redux/slices/userSlice";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      // Simulate login - In real app, this would be an API call
      if (
        values.email === "demo@foodiehub.com" &&
        values.password === "demo123"
      ) {
        const userData = {
          id: 1,
          name: "Demo User",
          email: values.email,
          phone: "9876543210",
          avatar: "",
        };
        dispatch(loginSuccess(userData));
        toast.success("Welcome back!", { icon: "👋" });
        navigate("/");
      } else {
        setError(
          "Invalid email or password. Try: demo@foodiehub.com / demo123",
        );
      }
    },
  });

  return (
    <div className="login-page">
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper className="login-paper">
            <Box className="login-header">
              <Typography variant="h4" className="login-title">
                Welcome Back! 👋
              </Typography>
              <Typography variant="body1" className="login-subtitle">
                Sign in to continue ordering delicious food
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" className="login-error">
                {error}
              </Alert>
            )}

            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                name="email"
                label="Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                className="login-input"
              />

              <TextField
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                className="login-input"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box className="forgot-password">
                <Link to="#">Forgot Password?</Link>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="login-btn"
              >
                Sign In
              </Button>
            </form>

            <Divider className="login-divider">
              <Typography variant="caption">OR</Typography>
            </Divider>

            <Box className="social-login">
              <Button
                variant="outlined"
                startIcon={<Google />}
                className="social-btn google"
              >
                Google
              </Button>
              <Button
                variant="outlined"
                startIcon={<Facebook />}
                className="social-btn facebook"
              >
                Facebook
              </Button>
            </Box>

            <Box className="register-link">
              <Typography variant="body2">
                Don't have an account? <Link to="/register">Sign Up</Link>
              </Typography>
            </Box>

            <Box className="demo-credentials">
              <Typography variant="caption">
                <strong>Demo Credentials:</strong>
                <br />
                Email: demo@foodiehub.com
                <br />
                Password: demo123
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </div>
  );
};

export default Login;
