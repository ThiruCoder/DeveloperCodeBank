import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar } from "@mui/material";
import { useSpring, animated } from "react-spring";

const Header = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay: 300,
  });

  return (
    <animated.div style={fadeIn}>
      <AppBar position="static" className="app-header">
        <Toolbar>
          <div className="app-header-logo">
            <div className="logo">
              <span className="logo-icon">
                <img
                  src="https://assets.codepen.io/285131/almeria-logo.svg"
                  alt="Logo"
                />
              </span>
              <Typography variant="h6" className="logo-title">
                <span>Almeria</span>
                <span>NeoBank</span>
              </Typography>
            </div>
          </div>
          <div className="app-header-navigation">
            <div className="tabs">
              <a href="#">Overview</a>
              <a href="#" className="active">
                Payments
              </a>
              <a href="#">Cards</a>
              <a href="#">Account</a>
              <a href="#">System</a>
              <a href="#">Business</a>
            </div>
          </div>
          <div className="app-header-actions">
            <button className="user-profile">
              <span>Matheo Peterson</span>
              <span>
                <Avatar
                  src="https://assets.codepen.io/285131/almeria-avatar.jpeg"
                  alt="User"
                />
              </span>
            </button>
            <div className="app-header-actions-buttons">
              <IconButton className="icon-button large">
                <i className="ph-magnifying-glass"></i>
              </IconButton>
              <IconButton className="icon-button large">
                <i className="ph-bell"></i>
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </animated.div>
  );
};

export default Header;
