import { useState } from "react";
import { useSpring, animated } from "react-spring";

import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Link,
  Divider,
} from "@mui/material";
import {
  Menu,
  Logout,
  Home,
  Info,
  Settings,
  Dashboard,
  People,
  ContactMail,
  Person,
  ReceiptLong,
  SwapHorizontalCircle,
  QueuePlayNext,
} from "@mui/icons-material";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function SideNavbar() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { text: "User Deetails", icon: <Person />, to: "/userDatails" },
    {
      text: "Money Transfer",
      icon: <SwapHorizontalCircle />,
      to: "/MoneyTransfer",
    },
    {
      text: "Transaction History",
      icon: <ReceiptLong />,
      to: "/TransactionHistory",
    },
    { text: "Deposit", icon: <QueuePlayNext />, to: "/deposit" },
    { text: "About", icon: <Info />, to: "/" },
  ];

  function handleLogOut() {
    doSignOut();
    setUserLoggedIn(false);
    localStorage.clear();
    navigate("/");
  }
  const slideAnimation = useSpring({
    transform: open ? "translateX(0%)" : "translateX(-100%)",
  });

  const navigate = useNavigate();

  return (
    <div>
      <IconButton onClick={() => setOpen(!open)}>
        <Menu fontSize="large" />
      </IconButton>

      <animated.div style={slideAnimation}>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          sx={{ overflow: "hidden" }}
          className="animate__animated animate__fadeInLeft"
        >
          <div
            style={{
              width: 200,
              height: "100%",
              padding: 20,
              backgroundColor: "rgb(248, 229, 235)",
              background:
                "linear-gradient( 90deg,rgba(248, 229, 235, 1) 0%,rgba(228, 235, 254, 1) 84%)",
              cursor: "pointer",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: "100%", marginBottom: 20, height: 100 }}
            />
            <List sx={{ pb: 6 }}>
              {menuItems.map((item, index) => (
                <>
                  <ListItem
                    button
                    key={index}
                    onClick={() => navigate(item?.to)}
                  >
                    {item?.icon}{" "}
                    <ListItemText
                      primary={item?.text}
                      style={{ marginLeft: 10 }}
                    />
                  </ListItem>

                  <Divider />
                </>
              ))}
            </List>
            <List sx={{ display: "flex", justifyContent: "center" }}>
              <ListItem button style={{}} onClick={handleLogOut}>
                <Logout />{" "}
                <ListItemText primary="Logout" style={{ marginLeft: 10 }} />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </animated.div>
    </div>
  );
}
