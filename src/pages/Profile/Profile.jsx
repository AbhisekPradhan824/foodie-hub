import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Avatar,
  Tabs,
  Tab,
  Divider,
  Chip,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import {
  Person,
  History,
  LocationOn,
  Edit,
  Save,
  Cancel,
  Logout,
  ShoppingBag,
  Email,
  Phone,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateProfile, logout } from "../../redux/slices/userSlice";
import { formatPrice, formatDate } from "../../utils/helpers";
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      phone: currentUser?.phone || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().matches(/^[6-9]\d{9}$/, "Invalid phone number"),
    }),
    onSubmit: (values) => {
      dispatch(updateProfile(values));
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    },
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    toast.info("Logged out successfully");
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "primary";
      case "Preparing":
        return "warning";
      case "Out for Delivery":
        return "info";
      case "Delivered":
        return "success";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  if (!currentUser) {
    return null;
  }

  const renderProfileTab = () => (
    <Paper className="profile-details-paper">
      <Box className="profile-details-header">
        <Typography variant="h6">Personal Information</Typography>
        {!isEditing ? (
          <IconButton onClick={() => setIsEditing(true)} className="edit-btn">
            <Edit />
          </IconButton>
        ) : (
          <Box>
            <IconButton
              onClick={() => formik.handleSubmit()}
              className="save-btn"
            >
              <Save />
            </IconButton>
            <IconButton
              onClick={() => setIsEditing(false)}
              className="cancel-btn"
            >
              <Cancel />
            </IconButton>
          </Box>
        )}
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="name"
              label="Full Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              disabled={!isEditing}
              InputProps={{
                startAdornment: <Person className="input-icon" />,
              }}
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
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              disabled={!isEditing}
              InputProps={{
                startAdornment: <Email className="input-icon" />,
              }}
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
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              disabled={!isEditing}
              InputProps={{
                startAdornment: <Phone className="input-icon" />,
              }}
            />
          </Grid>
        </Grid>
      </form>
    </Paper>
  );

  const renderOrdersTab = () => (
    <Paper className="orders-paper">
      <Typography variant="h6" className="orders-title">
        Order History
      </Typography>

      {orders.length === 0 ? (
        <Box className="no-orders">
          <ShoppingBag className="no-orders-icon" />
          <Typography variant="h6">No orders yet</Typography>
          <Typography variant="body2">
            Start ordering delicious food from our menu!
          </Typography>
          <Button
            variant="contained"
            className="order-now-btn"
            onClick={() => navigate("/menu")}
          >
            Order Now
          </Button>
        </Box>
      ) : (
        <Box className="orders-list">
          {orders.map((order) => (
            <Card key={order.id} className="order-card">
              <CardContent>
                <Box className="order-header">
                  <Box>
                    <Typography variant="subtitle1" className="order-id">
                      Order #{order.id}
                    </Typography>
                    <Typography variant="caption" className="order-date">
                      {formatDate(order.createdAt)}
                    </Typography>
                  </Box>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </Box>

                <Divider className="order-divider" />

                <Box className="order-items">
                  {order.items.slice(0, 3).map((item, index) => (
                    <Box key={index} className="order-item">
                      <img src={item.image} alt={item.name} />
                      <Box className="item-info">
                        <Typography variant="body2">{item.name}</Typography>
                        <Typography variant="caption">
                          Qty: {item.quantity} × {formatPrice(item.price)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                  {order.items.length > 3 && (
                    <Typography variant="caption" className="more-items">
                      +{order.items.length - 3} more items
                    </Typography>
                  )}
                </Box>

                <Divider className="order-divider" />

                <Box className="order-footer">
                  <Typography variant="body2">
                    Payment:{" "}
                    {order.paymentMethod === "cod"
                      ? "Cash on Delivery"
                      : order.paymentMethod === "card"
                        ? "Card"
                        : "UPI"}
                  </Typography>
                  <Typography variant="h6" className="order-total">
                    {formatPrice(order.total)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Paper>
  );

  const renderAddressTab = () => (
    <Paper className="address-paper">
      <Box className="address-header">
        <Typography variant="h6">Saved Addresses</Typography>
        <Button
          variant="outlined"
          startIcon={<LocationOn />}
          className="add-address-btn"
        >
          Add New Address
        </Button>
      </Box>

      <Box className="address-list">
        <Card className="address-card">
          <CardContent>
            <Box className="address-type">
              <Chip label="Home" size="small" color="primary" />
            </Box>
            <Typography variant="body1" className="address-name">
              {currentUser.name}
            </Typography>
            <Typography variant="body2" className="address-text">
              123 Main Street, Apartment 4B
              <br />
              Mumbai, Maharashtra 400001
              <br />
              Phone: {currentUser.phone || "+91 98765 43210"}
            </Typography>
            <Box className="address-actions">
              <Button size="small" startIcon={<Edit />}>
                Edit
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Card className="address-card">
          <CardContent>
            <Box className="address-type">
              <Chip label="Work" size="small" color="secondary" />
            </Box>
            <Typography variant="body1" className="address-name">
              {currentUser.name}
            </Typography>
            <Typography variant="body2" className="address-text">
              456 Business Park, Tower A<br />
              Bangalore, Karnataka 560001
              <br />
              Phone: {currentUser.phone || "+91 98765 43210"}
            </Typography>
            <Box className="address-actions">
              <Button size="small" startIcon={<Edit />}>
                Edit
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Paper>
  );

  return (
    <div className="profile-page">
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Grid container spacing={4}>
            {/* Profile Sidebar */}
            <Grid item xs={12} md={4}>
              <Paper className="profile-sidebar">
                <Box className="profile-avatar-section">
                  <Avatar className="profile-avatar">
                    {currentUser.name?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="h5" className="profile-name">
                    {currentUser.name}
                  </Typography>
                  <Typography variant="body2" className="profile-email">
                    {currentUser.email}
                  </Typography>
                </Box>

                <Divider />

                <Box className="profile-stats">
                  <Box className="stat-item">
                    <Typography variant="h4">{orders.length}</Typography>
                    <Typography variant="caption">Orders</Typography>
                  </Box>
                  <Box className="stat-item">
                    <Typography variant="h4">
                      {orders.filter((o) => o.status === "Delivered").length}
                    </Typography>
                    <Typography variant="caption">Delivered</Typography>
                  </Box>
                  <Box className="stat-item">
                    <Typography variant="h4">2</Typography>
                    <Typography variant="caption">Addresses</Typography>
                  </Box>
                </Box>

                <Divider />

                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Logout />}
                  fullWidth
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Paper>
            </Grid>

            {/* Profile Content */}
            <Grid item xs={12} md={8}>
              <Paper className="profile-content">
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  className="profile-tabs"
                >
                  <Tab icon={<Person />} label="Profile" />
                  <Tab icon={<History />} label="Orders" />
                  <Tab icon={<LocationOn />} label="Addresses" />
                </Tabs>

                <Box className="tab-content">
                  {activeTab === 0 && renderProfileTab()}
                  {activeTab === 1 && renderOrdersTab()}
                  {activeTab === 2 && renderAddressTab()}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </div>
  );
};

export default Profile;
