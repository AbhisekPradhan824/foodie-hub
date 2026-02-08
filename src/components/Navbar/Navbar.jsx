import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ShoppingCart,
  Menu as MenuIcon,
  Home,
  Restaurant,
  Info,
  ContactMail,
  Person,
  Logout,
  Login as LoginIcon,
  Close,
} from "@mui/icons-material";
import { selectCartCount } from "../../redux/slices/cartSlice";
import { logout } from "../../redux/slices/userSlice";
import "./Navbar.css";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const cartCount = useSelector(selectCartCount);
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleProfileMenuClose();
    navigate("/");
  };

  const navItems = [
    { name: "Home", path: "/", icon: <Home /> },
    { name: "Menu", path: "/menu", icon: <Restaurant /> },
    { name: "About", path: "/about", icon: <Info /> },
    { name: "Contact", path: "/contact", icon: <ContactMail /> },
  ];

  const drawer = (
    <Box className="mobile-drawer">
      <Box className="drawer-header">
        <Typography variant="h5" className="drawer-logo">
          🍔 Foodie Hub
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.name}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            className={location.pathname === item.path ? "active-link" : ""}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
        {!isAuthenticated && (
          <>
            <ListItem
              button
              component={Link}
              to="/login"
              onClick={handleDrawerToggle}
            >
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
        elevation={scrolled ? 4 : 0}
      >
        <Toolbar className="toolbar">
          <Link to="/" className="logo-link">
            <Typography variant="h5" className="logo">
              <span className="logo-icon">🍔</span>
              <span className="logo-text">Foodie Hub</span>
            </Typography>
          </Link>

          {!isMobile && (
            <Box className="nav-links">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          )}

          <Box className="nav-actions">
            <IconButton
              component={Link}
              to="/cart"
              className="cart-button"
              aria-label="cart"
            >
              <Badge
                badgeContent={cartCount}
                color="error"
                classes={{ badge: "cart-badge" }}
              >
                <ShoppingCart />
              </Badge>
            </IconButton>

            {isAuthenticated ? (
              <>
                <IconButton
                  onClick={handleProfileMenuOpen}
                  className="profile-button"
                >
                  <Avatar
                    alt={currentUser?.name}
                    src={currentUser?.avatar}
                    className="user-avatar"
                  >
                    {currentUser?.name?.charAt(0)}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleProfileMenuClose}
                  className="profile-menu"
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/profile");
                      handleProfileMenuClose();
                    }}
                  >
                    <Person sx={{ mr: 1 }} /> Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Logout sx={{ mr: 1 }} /> Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              !isMobile && (
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  className="login-btn"
                >
                  Login
                </Button>
              )
            )}

            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className="menu-button"
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        className="mobile-menu"
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
