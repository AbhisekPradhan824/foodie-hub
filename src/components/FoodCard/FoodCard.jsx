import React from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Rating,
} from "@mui/material";
import {
  Add,
  Favorite,
  FavoriteBorder,
  LocalFireDepartment,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/slices/cartSlice";
import { formatPrice, calculateDiscount } from "../../utils/helpers";
import "./FoodCard.css";

const FoodCard = ({ item }) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart!`, {
      icon: "🛒",
    });
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    toast.info(isFavorite ? "Removed from favorites" : "Added to favorites", {
      icon: isFavorite ? "💔" : "❤️",
    });
  };

  const discount = calculateDiscount(item.originalPrice, item.price);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
    >
      <Card className="food-card">
        {/* Image Section */}
        <Box className="card-image-container">
          <CardMedia
            component="img"
            image={item.image}
            alt={item.name}
            className="card-image"
          />

          {/* Badges */}
          <Box className="card-badges">
            {item.isBestseller && (
              <Chip
                label="Bestseller"
                className="badge bestseller"
                size="small"
              />
            )}
            {discount > 0 && (
              <Chip
                label={`${discount}% OFF`}
                className="badge discount"
                size="small"
              />
            )}
          </Box>

          {/* Favorite Button */}
          <IconButton className="favorite-btn" onClick={handleFavoriteToggle}>
            {isFavorite ? (
              <Favorite className="favorite-active" />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>

          {/* Veg/Non-veg indicator */}
          <Box className={`veg-indicator ${item.isVeg ? "veg" : "non-veg"}`}>
            <span className="indicator-dot"></span>
          </Box>
        </Box>

        {/* Content Section */}
        <CardContent className="card-content">
          <Box className="card-header">
            <Typography variant="h6" className="food-name">
              {item.name}
            </Typography>
            {item.isSpicy && <LocalFireDepartment className="spicy-icon" />}
          </Box>

          <Typography variant="body2" className="food-description">
            {item.description}
          </Typography>

          <Box className="rating-section">
            <Rating value={item.rating} precision={0.1} size="small" readOnly />
            <Typography variant="caption" className="review-count">
              ({item.reviews} reviews)
            </Typography>
          </Box>

          <Typography variant="caption" className="prep-time">
            🕐 {item.preparationTime}
          </Typography>

          <Box className="card-footer">
            <Box className="price-section">
              <Typography variant="h6" className="current-price">
                {formatPrice(item.price)}
              </Typography>
              {item.originalPrice > item.price && (
                <Typography variant="body2" className="original-price">
                  {formatPrice(item.originalPrice)}
                </Typography>
              )}
            </Box>

            <IconButton className="add-btn" onClick={handleAddToCart}>
              <Add />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FoodCard;
