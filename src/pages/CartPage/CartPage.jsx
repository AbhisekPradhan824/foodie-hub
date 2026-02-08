import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  TextField,
} from "@mui/material";
import {
  ShoppingBag,
  ArrowForward,
  LocalOffer,
  RemoveShoppingCart,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import CartItem from "../../components/Cart/CartItem";
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from "../../redux/slices/cartSlice";
import { formatPrice } from "../../utils/helpers";
import "./CartPage.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const [couponCode, setCouponCode] = React.useState("");
  const [discount, setDiscount] = React.useState(0);
  const [couponApplied, setCouponApplied] = React.useState(false);
  const [couponError, setCouponError] = React.useState("");

  const deliveryFee = cartTotal > 499 ? 0 : 40;
  const taxes = Math.round(cartTotal * 0.05);
  const finalTotal = cartTotal + deliveryFee + taxes - discount;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "FOODIE20") {
      setDiscount(Math.round(cartTotal * 0.2));
      setCouponApplied(true);
      setCouponError("");
    } else if (couponCode.toUpperCase() === "WELCOME10") {
      setDiscount(Math.round(cartTotal * 0.1));
      setCouponApplied(true);
      setCouponError("");
    } else {
      setDiscount(0);
      setCouponApplied(false);
      setCouponError("Invalid coupon code");
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setDiscount(0);
    setCouponApplied(false);
    setCouponError("");
  };

  const handleCheckout = () => {
    navigate("/checkout", {
      state: { discount, couponCode: couponApplied ? couponCode : "" },
    });
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="empty-cart-content"
          >
            <RemoveShoppingCart className="empty-cart-icon" />
            <Typography variant="h4" className="empty-cart-title">
              Your cart is empty
            </Typography>
            <Typography variant="body1" className="empty-cart-text">
              Looks like you haven't added anything to your cart yet. Explore
              our menu and find something delicious!
            </Typography>
            <Button
              variant="contained"
              className="explore-menu-btn"
              onClick={() => navigate("/menu")}
              endIcon={<ArrowForward />}
            >
              Explore Menu
            </Button>
          </motion.div>
        </Container>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Box className="cart-header">
            <Typography variant="h3" className="cart-title">
              <ShoppingBag className="cart-icon" />
              Your Cart
            </Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClearCart}
              className="clear-cart-btn"
            >
              Clear Cart
            </Button>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Paper className="cart-items-container">
                <Typography variant="h6" className="items-count">
                  {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
                </Typography>
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </AnimatePresence>
              </Paper>
            </motion.div>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Paper className="order-summary">
                <Typography variant="h6" className="summary-title">
                  Order Summary
                </Typography>

                {/* Coupon Section */}
                <Box className="coupon-section">
                  <Typography variant="subtitle2" className="coupon-label">
                    <LocalOffer /> Apply Coupon
                  </Typography>
                  <Box className="coupon-input-wrapper">
                    <TextField
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      size="small"
                      className="coupon-input"
                      disabled={couponApplied}
                      error={!!couponError}
                      helperText={couponError}
                    />
                    {couponApplied ? (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleRemoveCoupon}
                        className="remove-coupon-btn"
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={handleApplyCoupon}
                        className="apply-coupon-btn"
                      >
                        Apply
                      </Button>
                    )}
                  </Box>
                  {couponApplied && (
                    <Typography variant="caption" className="coupon-success">
                      🎉 Coupon applied successfully!
                    </Typography>
                  )}
                  <Box className="available-coupons">
                    <Typography variant="caption">
                      Try: <strong>FOODIE20</strong> for 20% off |{" "}
                      <strong>WELCOME10</strong> for 10% off
                    </Typography>
                  </Box>
                </Box>

                <Divider className="summary-divider" />

                {/* Price Breakdown */}
                <Box className="price-breakdown">
                  <Box className="price-row">
                    <Typography variant="body2">Subtotal</Typography>
                    <Typography variant="body2">
                      {formatPrice(cartTotal)}
                    </Typography>
                  </Box>
                  <Box className="price-row">
                    <Typography variant="body2">Delivery Fee</Typography>
                    <Typography
                      variant="body2"
                      className={deliveryFee === 0 ? "free" : ""}
                    >
                      {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
                    </Typography>
                  </Box>
                  <Box className="price-row">
                    <Typography variant="body2">Taxes (5%)</Typography>
                    <Typography variant="body2">
                      {formatPrice(taxes)}
                    </Typography>
                  </Box>
                  {discount > 0 && (
                    <Box className="price-row discount-row">
                      <Typography variant="body2">Discount</Typography>
                      <Typography variant="body2" className="discount-amount">
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

                {deliveryFee > 0 && (
                  <Typography variant="caption" className="free-delivery-note">
                    Add {formatPrice(500 - cartTotal)} more for FREE delivery
                  </Typography>
                )}

                <Button
                  variant="contained"
                  fullWidth
                  className="checkout-btn"
                  onClick={handleCheckout}
                  endIcon={<ArrowForward />}
                >
                  Proceed to Checkout
                </Button>

                <Button
                  variant="text"
                  fullWidth
                  className="continue-shopping-btn"
                  onClick={() => navigate("/menu")}
                >
                  Continue Shopping
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CartPage;
