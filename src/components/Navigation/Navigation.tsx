import React, { ElementType, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CreateIcon from "@mui/icons-material/Create";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import logo from "../../assets/logo.png";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { userLogoutThunk } from "../../thunks/userThunks/userLogoutThunk";
import { Logout } from "@mui/icons-material";
import { useSelector } from "react-redux";

function signOutUser() {
  const dispatch = useDispatch<AppDispatch>();

  dispatch(userLogoutThunk());
}

interface ListItemButtonProps {
  component: ElementType;
  path: string;
}

export const Navigation = () => {
  const { IsUserLoggedIn } = useSelector(
    (state: RootState) => state.userLoginThunk,
  );

  const navItems = [
    { title: "Home", icon: <HomeIcon /> },
    { title: "Recipes", path: "/recipes", icon: <MenuBookIcon /> },
    {
      title: "Favorite recipes",
      path: "/favoriteRecipes",
      icon: <FavoriteIcon />,
    },
    { title: "Create recipe", path: "/createRecipe", icon: <CreateIcon /> },
    { title: "Login", path: "/login", icon: <VpnKeyIcon /> },
    { title: "Signup", path: "/signup", icon: <HowToRegIcon /> },
    {
      title: "Log Out",
      path: "/login",
      icon: <Logout />,
      function: signOutUser(),
    },
  ];

  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const drawerList = (
    <Box
      sx={{ maxWidth: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 1,
        }}
      >
        <img
          src={logo}
          alt="App Logo"
          style={{ width: 32, height: 32, marginLeft: "0.3rem" }}
        />
        <Typography
          variant="h1"
          color="textPrimary"
          fontSize={"1.25rem"}
          marginLeft={"1.3em"}
        >
          Recipe App
        </Typography>
      </Box>
      <List>
        {navItems.map(({ title, path, icon }) => {
          const isActive = location.pathname === path;
          return (
            <ListItem key={path} disablePadding>
              <ListItemButton component={Link} to={path} selected={isActive}>
                <ListItemIcon
                  sx={{
                    color: isActive ? "secondary.main" : "inherit",
                    winWidth: "unset",
                    mr: 0.01,
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={title}
                  sx={{
                    fontWeight: isActive ? "bold" : "normal",
                    color: isActive ? "secondary.main" : "inherit",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1976d2",
      }}
    >
      <Toolbar
        sx={{
          display: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          to={"/"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            textDecoration: "none",
          }}
        >
          <img
            src={logo}
            alt="App Logo"
            style={{ maxWidth: 40, maxHeight: 40, marginRight: 10 }}
          />
          <Typography
            variant="h1"
            color="white"
            sx={{
              fontSize: "1.25rem",
              marginBottom: "0.25em",
            }}
          >
            Recipe App
          </Typography>
        </Link>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              size="large"
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawerList}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: "flex", gap: 1 }}>
            {navItems.map(({ title, path, icon }) => {
              const isActive = location.pathname === path;
              return (
                <Button
                  key={title}
                  component={Link}
                  to={path}
                  color={isActive ? "secondary" : "inherit"}
                  sx={{
                    fontWeight: isActive ? "bold" : "normal",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "rgba(77, 47, 167, 0.1)",
                      color: "darkblue",
                    },
                  }}
                >
                  {React.cloneElement(icon, {
                    fontSize: "small",
                    color: isActive ? "secondary" : "darkblue",
                  })}
                  {title}
                </Button>
              );
            })}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
