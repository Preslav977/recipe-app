import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Footer from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const logoUrl = "/vite.svg"; // fallback logo in public folder

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (route: string) => {
    navigate(route);
    handleMenuClose();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={{ m: 0, p: 0 }}
    >
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          width: "100%",
          left: 0,
          right: 0,
          boxSizing: "border-box",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            maxWidth: "lg",
            width: "100%",
            mx: "auto",
            px: { xs: 1, sm: 2 },
            minHeight: { xs: 56, sm: 64 },
          }}
        >
          {/* Logo at the far left, then project name */}
          <Box
            display="flex"
            alignItems="center"
            sx={{ cursor: "pointer" }}
            onClick={handleLogoClick}
          >
            <img
              src={logoUrl}
              alt="Logo"
              style={{ height: 32, maxHeight: 40, paddingRight: 8 }}
            />
          </Box>
          <Typography
            variant="h6"
            component="span"
            sx={{
              fontWeight: 700,
              color: "white",
              ml: { xs: 0.5, sm: 1 },
              fontSize: { xs: "1rem", sm: "1.25rem" },
              display: { xs: "none", sm: "inline" },
              cursor: "pointer",
            }}
            onClick={handleLogoClick}
          >
            Grow It Recipe App
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            color="inherit"
            onClick={handleMenuOpen}
            endIcon={<MenuIcon />}
            sx={{
              mr: { xs: 1, sm: 2 },
              fontSize: { xs: "0.9rem", sm: "1rem" },
              px: { xs: 1, sm: 2 },
            }}
          >
            <Box
              component="span"
              sx={{ display: { xs: "none", sm: "inline" } }}
            >
              Account
            </Box>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={() => handleMenuItemClick("/signup")}>
              Sign Up
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("/login")}>
              Login
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      {/* Add top padding to Container to offset fixed AppBar height */}
      <Container maxWidth="lg" sx={{ flex: 1, py: 4, pt: { xs: 10, sm: 12 } }}>
        {children}
      </Container>
      <Box
        component="footer"
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 2,
          width: "100%",
          boxSizing: "border-box",
          position: "fixed",
          bottom: 0,
          left: 0,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            maxWidth: "lg",
            width: "100%",
            mx: "auto",
            px: 2,
            minHeight: "unset !important",
          }}
        >
          <Typography variant="body2" align="center" sx={{ width: "100%" }}>
            © {new Date().getFullYear()} Grow It Recipe App. All rights
            reserved.
          </Typography>
        </Toolbar>
      </Box>
    </Box>
  );
};

export default Layout;
