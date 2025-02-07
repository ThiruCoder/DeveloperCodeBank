import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HeadNavbar from "./OptionalNavbar/headNavbar";
import SideNavbar from "./OptionalNavbar/sideNavbar";
import { useMediaQuery } from "@mui/material";
import { GlobalContext } from "./Context/Context";
import { doSignOut } from "../../../Main-Redux/FireBase/FirebaseAuth";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import img from "../ViewGrid/assets/logo.png";

const Navbar = () => {
  const menuIcon = useMediaQuery("(min-width:792px)");
  const { handleButtonChange, userLoggedIn, setUserLoggedIn } =
    useContext(GlobalContext);

  const navigate = useNavigate();
  function handleLogOut() {
    doSignOut();
    setUserLoggedIn(false);
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, position: "sticky", top: "8px" }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "rgb(228,235,254)",
            background:
              "linear-gradient(90deg, rgba(228,235,254,1) 0%, rgba(248,229,235,1) 84%)",
            top: "20px",
            position: "sticky",
            boxShadow: "0px 0px 40px 40px rgb(228,235,254)",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: menuIcon ? "space-evenly" : "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  // backgroundColor: "rgb(3,24,31)",
                  background:
                    "linear-gradient(90deg, rgba(3,24,31,1) 0%, rgba(4,13,15,1) 100%)",
                  overflow: "hidden",
                  WebkitTextFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                }}
                mt={1}
              >
                <span style={{ display: "flex", flexDirection: "row" }}>
                  <img src={img} alt="" width={90} />
                  <Typography
                    variant="subtitle1"
                    position={"relative"}
                    right={8}
                    fontSize={40}
                  >
                    B
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    position={"relative"}
                    top={27}
                    right={7}
                  >
                    ank
                  </Typography>
                </span>
              </Typography>
            </div>
            <div>{menuIcon ? <HeadNavbar /> : null}</div>
            <div>
              {menuIcon ? (
                <Button
                  color="inherit"
                  onClick={handleLogOut}
                  sx={{
                    background: "rgb(3,24,31)",
                    background:
                      "linear-gradient(90deg, rgba(3,24,31,1) 0%, rgba(4,13,15,1) 100%)",
                    overflow: "hidden",
                    WebkitTextFillColor: "transparent",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  LogOut
                </Button>
              ) : null}
            </div>
          </Toolbar>
        </AppBar>
        {!userLoggedIn ? <LinearProgress /> : null}
        {menuIcon ? null : <SideNavbar />}
      </Box>
    </>
  );
};

export default Navbar;
