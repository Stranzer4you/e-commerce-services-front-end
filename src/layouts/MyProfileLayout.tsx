import React, { useEffect, useState } from "react";
import { Box, Button, Typography, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate, Outlet } from "react-router-dom";
import "../styles/myProfileLayoutCss.css";

const MyProfileLayout = () => {
  const navigate = useNavigate();


  return (
    <div className="account-container">
      {/* Banner */}
      <div className="account-banner">
        <Button className="back-button" onClick={() => navigate("/")}>← Back to Shopping</Button>
        <Typography variant="h6" className="banner-title">My Account</Typography>
        <div className="banner-spacer"></div>
      </div>

      {/* Main Content Area */}
      <div className="account-body">
        {/* Sidebar */}
        <div className="account-sidebar">
          <List>
              <ListItemButton className="sidebar-item" onClick={() => navigate("cart")}> 
              <ListItemIcon className="sidebar-icon"><FavoriteIcon /></ListItemIcon>
              <ListItemText primary="My Cart" />
            </ListItemButton>
            <ListItemButton className="sidebar-item" onClick={() => navigate("wishlist")}> 
              <ListItemIcon className="sidebar-icon"><FavoriteIcon /></ListItemIcon>
              <ListItemText primary="My Wishlist" />
            </ListItemButton>

            <ListItemButton className="sidebar-item" onClick={() => navigate("orders")}> 
              <ListItemIcon className="sidebar-icon"><ShoppingBagIcon /></ListItemIcon>
              <ListItemText primary="My Orders" />
            </ListItemButton>

            <ListItemButton className="sidebar-item" onClick={() => navigate("notifications")}> 
              <ListItemIcon className="sidebar-icon"><NotificationsIcon /></ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItemButton>
            
          </List>
        </div>

        {/* Dynamic Content */}
        <div className="account-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MyProfileLayout;