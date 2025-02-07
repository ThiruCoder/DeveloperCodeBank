import { Box, Button, Grid, Link, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { GlobalContext } from "./CustomerViewPage/ViewGrid/Context/Context";

const NoPageFound = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useContext(GlobalContext);
  return (
    <>
      <Paper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60% ",
            mt: "18%",
            marginX: "10%",

            flexDirection: "column",
          }}
        >
          <Box my={3}>
            <Typography>No page found</Typography>
          </Box>
          <Box my={3}>
            <Navigate to={userLoggedIn ? "/home" : "/"} replace />
            <Button
              onClick={() => navigate(userLoggedIn ? "/home" : "/")}
              variant="contained"
            >
              Move to {userLoggedIn ? "Home" : "LogIn"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default NoPageFound;
