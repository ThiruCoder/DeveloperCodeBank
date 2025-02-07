import { Box, Button, Grid, Link, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NoPageFound = () => {
  const navigate = useNavigate();
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
            <Button onClick={() => navigate("/home")} variant="contained">
              Move to Home
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default NoPageFound;
