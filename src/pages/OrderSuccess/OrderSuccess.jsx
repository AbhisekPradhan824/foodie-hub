import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
} from "@mui/material";
import {
  CheckCircle,
  Receipt,
  LocalShipping,
  Home,
  Restaurant,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { formatPrice, formatDate } from "../../utils/helpers";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { currentOrder } = useSelector((state) => state.order);
  const [showConfetti, setShowConfetti] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const orderSteps = [
    { label: "Order Placed", icon: <Receipt /> },
    { label: "Preparing", icon: <Restaurant /> },
    { label: "Out for Delivery", icon: <LocalShipping /> },
    { label: "Delivered", icon: <Home /> },
  ];

  if (!currentOrder) {
    return (
      <Container maxWidth="sm" className="no-order-container">
        <Paper className="no-order-paper">
          <Typography variant="h5">No recent order found</Typography>
          <Button
            variant="contained"
            className="menu-btn"
            onClick={() => navigate("/menu")}
          >
            Go to Menu
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <div className="order-success-page">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          colors={["#FF6B35", "#F7931E", "#2EC4B6", "#00B894", "#9B59B6"]}
        />
      )}

      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper className="success-paper">
            {/* Success Header */}
            <Box className="success-header">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="success-icon" />
              </motion.div>
              <Typography variant="h4" className="success-title">
                Order Placed Successfully! 🎉
              </Typography>
              <Typography variant="body1" className="success-subtitle">
                Thank you for ordering from Foodie Hub
              </Typography>
            </Box>

            {/* Order Info */}
            <Box className="order-info">
              <Box className="order-info-item">
                <Typography variant="caption">Order ID</Typography>
                <Typography variant="h6">{currentOrder.id}</Typography>
              </Box>
              <Box className="order-info-item">
                <Typography variant="caption">Order Date</Typography>
                <Typography variant="h6">
                  {formatDate(currentOrder.createdAt)}
                </Typography>
              </Box>
              <Box className="order-info-item">
                <Typography variant="caption">Total Amount</Typography>
                <Typography variant="h6" className="order-total">
                  {formatPrice(currentOrder.total)}
                </Typography>
              </Box>
            </Box>

            <Divider className="success-divider" />

            {/* Order Tracking */}
            <Box className="order-tracking">
              <Typography variant="h6" className="tracking-title">
                Order Status
              </Typography>
              <Stepper
                activeStep={0}
                alternativeLabel
                className="order-stepper"
              >
                {orderSteps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      StepIconComponent={() => (
                        <Box
                          className={`step-icon ${index === 0 ? "active" : ""}`}
                        >
                          {step.icon}
                        </Box>
                      )}
                    >
                      {step.label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Typography variant="body2" className="estimated-time">
                Estimated delivery: 30-45 minutes
              </Typography>
            </Box>

            <Divider className="success-divider" />

            {/* Delivery Address */}
            <Box className="delivery-info">
              <Typography variant="h6" className="delivery-title">
                Delivery Address
              </Typography>
              <Typography variant="body2">
                {currentOrder.address.fullName}
                <br />
                {currentOrder.address.address}
                <br />
                {currentOrder.address.city}, {currentOrder.address.state} -{" "}
                {currentOrder.address.pincode}
                <br />
                Phone: {currentOrder.address.phone}
              </Typography>
            </Box>

            <Divider className="success-divider" />

            {/* Order Items */}
            <Box className="order-items-summary">
              <Typography variant="h6" className="items-title">
                Order Items ({currentOrder.items.length})
              </Typography>
              {currentOrder.items.map((item, index) => (
                <Box key={index} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <Box className="item-details">
                    <Typography variant="body1">{item.name}</Typography>
                    <Typography variant="caption">
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </Typography>
                  </Box>
                  <Typography variant="body1" className="item-total">
                    {formatPrice(item.price * item.quantity)}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Action Buttons */}
            <Box className="success-actions">
              <Button
                variant="outlined"
                className="track-btn"
                onClick={() => navigate("/profile")}
              >
                Track Order
              </Button>
              <Button
                variant="contained"
                className="continue-btn"
                onClick={() => navigate("/menu")}
              >
                Continue Ordering
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </div>
  );
};

export default OrderSuccess;
