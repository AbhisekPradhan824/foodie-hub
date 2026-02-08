import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Chip,
  FormControl,
  Select,
  MenuItem,
  Slider,
  Switch,
  FormControlLabel,
  Drawer,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Search, FilterList, Close, Sort } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import FoodCard from "../../components/FoodCard/FoodCard";
import { foodItems, categories } from "../../data/foodData";
import { formatPrice } from "../../utils/helpers";
import "./Menu.css";

const Menu = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [vegOnly, setVegOnly] = useState(false);
  const [filteredItems, setFilteredItems] = useState(foodItems);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  useEffect(() => {
    let filtered = [...foodItems];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1],
    );

    // Veg filter
    if (vegOnly) {
      filtered = filtered.filter((item) => item.isVeg);
    }

    // Sorting
    switch (sortBy) {
      case "priceLow":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "priceHigh":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
      default:
        filtered.sort((a, b) => b.reviews - a.reviews);
    }

    setFilteredItems(filtered);
  }, [searchQuery, selectedCategory, sortBy, priceRange, vegOnly]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("popularity");
    setPriceRange([0, 500]);
    setVegOnly(false);
  };

  const FilterContent = () => (
    <Box className="filter-content">
      <Typography variant="h6" className="filter-title">
        Filters
      </Typography>

      {/* Price Range */}
      <Box className="filter-section">
        <Typography variant="subtitle2" className="filter-label">
          Price Range
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={500}
          valueLabelFormat={(value) => formatPrice(value)}
          className="price-slider"
        />
        <Box className="price-range-labels">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </Box>
      </Box>

      {/* Veg Only */}
      <Box className="filter-section">
        <FormControlLabel
          control={
            <Switch
              checked={vegOnly}
              onChange={(e) => setVegOnly(e.target.checked)}
              color="success"
            />
          }
          label="Vegetarian Only"
          className="veg-switch"
        />
      </Box>

      {/* Sort By */}
      <Box className="filter-section">
        <Typography variant="subtitle2" className="filter-label">
          Sort By
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <MenuItem value="popularity">Popularity</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="priceLow">Price: Low to High</MenuItem>
            <MenuItem value="priceHigh">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Button
        variant="outlined"
        fullWidth
        onClick={clearFilters}
        className="clear-filters-btn"
      >
        Clear All Filters
      </Button>
    </Box>
  );

  return (
    <div className="menu-page">
      {/* Header */}
      <Box className="menu-header">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h2" className="menu-title">
              Our <span className="gradient-text">Menu</span>
            </Typography>
            <Typography variant="body1" className="menu-subtitle">
              Explore our wide variety of delicious Indian dishes
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" className="menu-container">
        {/* Search and Filter Bar */}
        <Box className="search-filter-bar">
          <TextField
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          {isMobile ? (
            <IconButton
              className="filter-btn-mobile"
              onClick={() => setFilterDrawerOpen(true)}
            >
              <FilterList />
            </IconButton>
          ) : (
            <Box className="desktop-filters">
              <FormControl size="small" className="sort-control">
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  startAdornment={<Sort className="sort-icon" />}
                >
                  <MenuItem value="popularity">Popularity</MenuItem>
                  <MenuItem value="rating">Rating</MenuItem>
                  <MenuItem value="priceLow">Price: Low to High</MenuItem>
                  <MenuItem value="priceHigh">Price: High to Low</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch
                    checked={vegOnly}
                    onChange={(e) => setVegOnly(e.target.checked)}
                    color="success"
                    size="small"
                  />
                }
                label="Veg"
                className="veg-toggle"
              />
            </Box>
          )}
        </Box>

        {/* Categories */}
        <Box className="categories-bar">
          {categories.map((category) => (
            <Chip
              key={category.id}
              label={`${category.icon} ${category.name}`}
              onClick={() => setSelectedCategory(category.name)}
              className={`category-chip ${selectedCategory === category.name ? "active" : ""}`}
            />
          ))}
        </Box>

        {/* Results Info */}
        <Box className="results-info">
          <Typography variant="body2">
            Showing <strong>{filteredItems.length}</strong> dishes
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </Typography>
        </Box>

        {/* Food Grid */}
        <Grid container spacing={3}>
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <FoodCard item={item} />
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <Box className="no-results">
            <Typography variant="h5">No dishes found</Typography>
            <Typography variant="body1">
              Try adjusting your filters or search query
            </Typography>
            <Button
              variant="contained"
              onClick={clearFilters}
              className="reset-btn"
            >
              Reset Filters
            </Button>
          </Box>
        )}
      </Container>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        className="filter-drawer"
      >
        <Box className="drawer-header">
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={() => setFilterDrawerOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        <FilterContent />
      </Drawer>
    </div>
  );
};

export default Menu;
