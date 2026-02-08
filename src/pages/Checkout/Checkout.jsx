import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
  Alert,
} from "@mui/material";
import {
  LocalShipping,
  Payment,
  CheckCircle,
  CreditCard,
  AccountBalance,
  Money,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from "../../redux/slices/cartSlice";
import { placeOrder } from "../../redux/slices/orderSlice";
import { formatPrice } from "../../utils/helpers";
import "./Checkout.css";

const steps = ["Delivery Address", "Payment Method", "Review Order"];

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);

  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const discount = location.state?.discount || 0;
  const couponCode = location.state?.couponCode || "";
  const deliveryFee = cartTotal > 499 ? 0 : 40;
  const taxes = Math.round(cartTotal * 0.05);
  const finalTotal = cartTotal + deliveryFee + taxes - discount;

  const addressFormik = useFormik({
    initialValues: {
      fullName: currentUser?.name || "",
      phone: currentUser?.phone || "",
      email: currentUser?.email || "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      phone: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Enter valid 10-digit phone number")
        .required("Phone number is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      pincode: Yup.string()
        .matches(/^[1-9][0-9]{5}$/, "Enter valid 6-digit pincode")
        .required("Pincode is required"),
    }),
    onSubmit: () => {
      setActiveStep(1);
    },
  });

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handlePaymentNext = () => {
    setActiveStep(2);
  };

  const handlePlaceOrder = () => {
    const orderData = {
      items: cartItems,
      address: addressFormik.values,
      paymentMethod,
      subtotal: cartTotal,
      deliveryFee,
      taxes,
      discount,
      couponCode,
      total: finalTotal,
    };

    dispatch(placeOrder(orderData));
    dispatch(clearCart());
    navigate("/order-success");
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" className="checkout-empty">
        <Alert severity="warning" className="empty-alert">
          Your cart is empty. Please add items before checkout.
        </Alert>
        <Button
          variant="contained"
          onClick={() => navigate("/menu")}
          className="go-to-menu-btn"
        >
          Go to Menu
        </Button>
      </Container>
    );
  }

  const renderAddressForm = () => (
    <Paper className="checkout-form-paper">
      <Typography variant="h6" className="form-title">
        <LocalShipping /> Delivery Address
      </Typography>
      <form onSubmit={addressFormik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="fullName"
              label="Full Name"
              value={addressFormik.values.fullName}
              onChange={addressFormik.handleChange}
              onBlur={addressFormik.handleBlur}
              error={
                addressFormik.touched.fullName &&
                Boolean(addressFormik.errors.fullName)
              }
              helperText={
                addressFormik.touched.fullName && addressFormik.errors.fullName
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="phone"
              label="Phone Number"
              value={addressFormik.values.phone}
              onChange={addressFormik.handleChange}
              onBlur={addressFormik.handleBlur}
              error={
                addressFormik.touched.phone &&
                Boolean(addressFormik.errors.phone)
              }
              helperText={
                addressFormik.touched.phone && addressFormik.errors.phone
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="email"
              label="Email Address"
              value={addressFormik.values.email}
              onChange={addressFormik.handleChange}
              onBlur={addressFormik.handleBlur}
              error={
                addressFormik.touched.email &&
                Boolean(addressFormik.errors.email)
              }
              helperText={
                addressFormik.touched.email && addressFormik.errors.email
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              name="address"
              label="Street Address"
              value={addressFormik.values.address}
              onChange={addressFormik.handleChange}
              onBlur={addressFormik.handleBlur}
              error={
                addressFormik.touched.address &&
                Boolean(addressFormik.errors.address)
              }
              helperText={
                addressFormik.touched.address && addressFormik.errors.address
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="city"
              label="City"
              value={addressFormik.values.city}
              onChange={addressFormik.handleChange}
              onBlur={addressFormik.handleBlur}
              error={
                addressFormik.touched.city && Boolean(addressFormik.errors.city)
              }
              helperText={
                addressFormik.touched.city && addressFormik.errors.city
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="state"
              label="State"
              value={addressFormik.values.state}
              onChange={addressFormik.handleChange}
              onBlur={addressFormik.handleBlur}
              error={
                addressFormik.touched.state &&
                Boolean(addressFormik.errors.state)
              }
              helperText={
                addressFormik.touched.state && addressFormik.errors.state
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="pincode"
              label="Pincode"
              value={addressFormik.values.pincode}
              onChange={addressFormik.handleChange}
              onBlur={addressFormik.handleBlur}
              error={
                addressFormik.touched.pincode &&
                Boolean(addressFormik.errors.pincode)
              }
              helperText={
                addressFormik.touched.pincode && addressFormik.errors.pincode
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="landmark"
              label="Landmark (Optional)"
              value={addressFormik.values.landmark}
              onChange={addressFormik.handleChange}
            />
          </Grid>
        </Grid>
        <Box className="form-actions">
          <Button variant="contained" type="submit" className="next-btn">
            Continue to Payment
          </Button>
        </Box>
      </form>
    </Paper>
  );

  const renderPaymentForm = () => (
    <Paper className="checkout-form-paper">
      <Typography variant="h6" className="form-title">
        <Payment /> Payment Method
      </Typography>
      <FormControl component="fieldset" className="payment-options">
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <Paper
            className={`payment-option ${paymentMethod === "cod" ? "selected" : ""}`}
          >
            <FormControlLabel
              value="cod"
              control={<Radio />}
              label={
                <Box className="payment-label">
                  <Money className="payment-icon" />
                  <Box>
                    <Typography variant="subtitle1">
                      Cash on Delivery
                    </Typography>
                    <Typography variant="caption">
                      Pay when you receive your order
                    </Typography>
                  </Box>
                </Box>
              }
            />
          </Paper>
          <Paper
            className={`payment-option ${paymentMethod === "card" ? "selected" : ""}`}
          >
            <FormControlLabel
              value="card"
              control={<Radio />}
              label={
                <Box className="payment-label">
                  <CreditCard className="payment-icon" />
                  <Box>
                    <Typography variant="subtitle1">
                      Credit/Debit Card
                    </Typography>
                    <Typography variant="caption">
                      Visa, Mastercard, RuPay
                    </Typography>
                  </Box>
                </Box>
              }
            />
          </Paper>
          <Paper
            className={`payment-option ${paymentMethod === "upi" ? "selected" : ""}`}
          >
            <FormControlLabel
              value="upi"
              control={<Radio />}
              label={
                <Box className="payment-label">
                  <AccountBalance className="payment-icon" />
                  <Box>
                    <Typography variant="subtitle1">UPI</Typography>
                    <Typography variant="caption">
                      Google Pay, PhonePe, Paytm
                    </Typography>
                  </Box>
                </Box>
              }
            />
          </Paper>
        </RadioGroup>
      </FormControl>
      <Box className="form-actions">
        <Button variant="outlined" onClick={handleBack} className="back-btn">
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handlePaymentNext}
          className="next-btn"
        >
          Review Order
        </Button>
      </Box>
    </Paper>
  );

  const renderReviewOrder = () => (
    <Paper className="checkout-form-paper">
      <Typography variant="h6" className="form-title">
        <CheckCircle /> Review Your Order
      </Typography>

      {/* Delivery Address Summary */}
      <Box className="review-section">
        <Typography variant="subtitle2" className="review-label">
          Delivery Address
        </Typography>
        <Typography variant="body2">
          {addressFormik.values.fullName}
          <br />
          {addressFormik.values.address}
          <br />
          {addressFormik.values.city}, {addressFormik.values.state} -{" "}
          {addressFormik.values.pincode}
          <br />
          Phone: {addressFormik.values.phone}
        </Typography>
      </Box>

      <Divider className="review-divider" />

      {/* Payment Method Summary */}
      <Box className="review-section">
        <Typography variant="subtitle2" className="review-label">
          Payment Method
        </Typography>
        <Typography variant="body2">
          {paymentMethod === "cod" && "Cash on Delivery"}
          {paymentMethod === "card" && "Credit/Debit Card"}
          {paymentMethod === "upi" && "UPI Payment"}
        </Typography>
      </Box>

      <Divider className="review-divider" />

      {/* Order Items Summary */}
      <Box className="review-section">
        <Typography variant="subtitle2" className="review-label">
          Order Items ({cartItems.length})
        </Typography>
        {cartItems.map((item) => (
          <Box key={item.id} className="review-item">
            <img src={item.image} alt={item.name} />
            <Box className="review-item-details">
              <Typography variant="body2">{item.name}</Typography>
              <Typography variant="caption">Qty: {item.quantity}</Typography>
            </Box>
            <Typography variant="body2" className="review-item-price">
              {formatPrice(item.price * item.quantity)}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box className="form-actions">
        <Button variant="outlined" onClick={handleBack} className="back-btn">
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handlePlaceOrder}
          className="place-order-btn"
        >
          Place Order - {formatPrice(finalTotal)}
        </Button>
      </Box>
    </Paper>
  );

  return (
    <div className="checkout-page">
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Typography variant="h3" className="checkout-title">
            Checkout
          </Typography>

          <Stepper activeStep={activeStep} className="checkout-stepper">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </motion.div>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeStep === 0 && renderAddressForm()}
              {activeStep === 1 && renderPaymentForm()}
              {activeStep === 2 && renderReviewOrder()}
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper className="order-summary-checkout">
              <Typography variant="h6" className="summary-title">
                Order Summary
              </Typography>

              <Box className="summary-items">
                {cartItems.slice(0, 3).map((item) => (
                  <Box key={item.id} className="summary-item">
                    <Typography variant="body2">
                      {item.name} x {item.quantity}
                    </Typography>
                    <Typography variant="body2">
                      {formatPrice(item.price * item.quantity)}
                    </Typography>
                  </Box>
                ))}
                {cartItems.length > 3 && (
                  <Typography variant="caption" className="more-items">
                    +{cartItems.length - 3} more items
                  </Typography>
                )}
              </Box>

              <Divider className="summary-divider" />

              <Box className="price-breakdown">
                <Box className="price-row">
                  <Typography variant="body2">Subtotal</Typography>
                  <Typography variant="body2">
                    {formatPrice(cartTotal)}
                  </Typography>
                </Box>
                <Box className="price-row">
                  <Typography variant="body2">Delivery</Typography>
                  <Typography
                    variant="body2"
                    className={deliveryFee === 0 ? "free" : ""}
                  >
                    {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
                  </Typography>
                </Box>
                <Box className="price-row">
                  <Typography variant="body2">Taxes</Typography>
                  <Typography variant="body2">{formatPrice(taxes)}</Typography>
                </Box>
                {discount > 0 && (
                  <Box className="price-row">
                    <Typography variant="body2">Discount</Typography>
                    <Typography variant="body2" className="discount">
                      -{formatPrice(discount)}
                    </Typography>
                  </Box>
                )}
              </Box>

              <Divider className="summary-divider" />

              <Box className="total-row">
                <Typography variant="h6">Total</Typography>
                <Typography variant="h5" className="total-amount">
                  {formatPrice(finalTotal)}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Checkout;
