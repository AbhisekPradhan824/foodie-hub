import React from "react";
import { useDispatch } from "react-redux";
import { Box, Typography, IconButton } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { motion } from "framer-motion";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import { formatPrice } from "../../utils/helpers";
import "./CartItem.css";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(incrementQuantity(item.id));
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(decrementQuantity(item.id));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="cart-item"
    >
      <Box className="cart-item-image">
        <img src={item.image} alt={item.name} />
        <Box className={`veg-badge ${item.isVeg ? "veg" : "non-veg"}`}>
          <span></span>
        </Box>
      </Box>

      <Box className="cart-item-details">
        <Typography variant="h6" className="item-name">
          {item.name}
        </Typography>
        <Typography variant="body2" className="item-price">
          {formatPrice(item.price)} x {item.quantity}
        </Typography>
      </Box>

      <Box className="cart-item-actions">
        <Box className="quantity-controls">
          <IconButton
            className="qty-btn"
            onClick={handleDecrement}
            disabled={item.quantity <= 1}
          >
            <Remove fontSize="small" />
          </IconButton>
          <Typography className="quantity">{item.quantity}</Typography>
          <IconButton className="qty-btn" onClick={handleIncrement}>
            <Add fontSize="small" />
          </IconButton>
        </Box>

        <Typography variant="h6" className="item-total">
          {formatPrice(item.price * item.quantity)}
        </Typography>

        <IconButton className="delete-btn" onClick={handleRemove}>
          <Delete />
        </IconButton>
      </Box>
    </motion.div>
  );
};

export default CartItem;
