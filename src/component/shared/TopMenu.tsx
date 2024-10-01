import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Menu,
  MenuItem,
  Container,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../app/service/shared/store";
import { authActions } from "../../app/service/shared/authSlice";
import CartIcon from "./CartIcon";
import FavouriteIcon from "./FavouriteIcon";

const TopMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, userName, isAdmin } = useSelector(
    (state: RootState) => state.authR
  );
  const [anchorElShop, setAnchorElShop] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElShop(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElShop(null);
  };

  const handleSignOut = () => {
    dispatch(authActions.logout());
    toast.success("You've been logged out. We hope to see you back soon!");
    navigate("/home");
  };
  const [searchKey, setSearchKey] = useState("");
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigate("/product", { state: { searchKey } });
    }
  };
  return (
    <>
      <ToastContainer
        position='top-left'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AppBar
        position='fixed'
        color='transparent'
        elevation={0}
        sx={{
          backgroundColor: "#343a40",
          color: "#fff",
          borderBottom: "1px solid #eee",
          width: "100%",
        }}
      >
        <Container
          disableGutters
          maxWidth={false}
          sx={{
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "0 20px ",
              width: "100%",
            }}
          >
            <Typography
              variant='h6'
              component='div'
              sx={{
                ml: 2,
                fontSize: "1.5rem",
                fontWeight: "bold",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                padding: "4px 8px",
                display: "inline-block",
                flexGrow: 1,
                textAlign: "left",
              }}
            >
              {isAdmin ? (
                <>
                  <IconButton
                    color='inherit'
                    onClick={() => navigate("admin/home")}
                  >
                    <HomeIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton color='inherit' onClick={() => navigate("/")}>
                    <HomeIcon />
                  </IconButton>
                </>
              )}
              <DirectionsBikeIcon sx={{ fontSize: "2rem", mr: 1 }} />
              Dorpa Shop
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "0 8px",
                mx: 2,
              }}
            >
              {isLoggedIn && (
                <>
                  <Menu
                    id='Menu'
                    anchorEl={anchorElShop}
                    open={Boolean(anchorElShop)}
                    onClose={handleMenuClose}
                  >
                    {!isAdmin && (
                      <>
                        {" "}
                        <MenuItem onClick={() => navigate("/user/order-list")}>
                          <ReceiptIcon />
                          My orders
                        </MenuItem>
                        <MenuItem onClick={() => navigate("/user/cartDetail")}>
                          <ShoppingCartIcon />
                          My cart
                        </MenuItem>
                      </>
                    )}
                    {isAdmin && (
                      <>
                        <MenuItem onClick={() => navigate("/admin/products")}>
                          <ReceiptIcon />
                          Product Management
                        </MenuItem>{" "}
                        <MenuItem
                          onClick={() => navigate("/admin/createproduct")}
                        >
                          <ReceiptIcon />
                          Add Product
                        </MenuItem>
                        <MenuItem onClick={() => navigate("/admin/users")}>
                          <ReceiptIcon />
                          User Management
                        </MenuItem>
                      </>
                    )}
                    <MenuItem onClick={handleSignOut}>
                      <ExitToAppIcon />
                      <span>Logout</span>
                    </MenuItem>
                  </Menu>
                </>
              )}

              <SearchIcon />
              <InputBase
                placeholder='Search…'
                inputProps={{ "aria-label": "search" }}
                sx={{ ml: 1, flex: 1, color: "white" }}
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </Box>
            {isLoggedIn && (
              <>
                <IconButton
                  color='inherit'
                  aria-controls='shop-menu'
                  aria-haspopup='true'
                  onClick={handleMenuOpen}
                >
                  <MenuIcon />
                </IconButton>
              </>
            )}

            <Box sx={{ display: "flex", alignItems: "right", ml: "auto" }}>
              {!isLoggedIn && (
                <>
                  <IconButton
                    color='inherit'
                    onClick={() => navigate("/login")}
                  >
                    <LockOpenIcon />
                  </IconButton>
                  <IconButton
                    color='inherit'
                    onClick={() => navigate("/register")}
                  >
                    <PersonAddIcon />
                  </IconButton>
                </>
              )}

              {isLoggedIn && !isAdmin && (
                <span className='d-flex align-items-center fs-5'>
                  <CartIcon />
                </span>
              )}
              {isLoggedIn && !isAdmin && (
                <span className='d-flex align-items-center fs-5 mx-3'>
                  <FavouriteIcon />
                </span>
              )}
              {isLoggedIn && (
                <span>
                  {userName}{" "}
                  <IconButton color='inherit' onClick={handleSignOut}>
                    <ExitToAppIcon />
                  </IconButton>
                </span>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default TopMenu;
