import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grids from "./ViewGrid/Grids";
import Navbar from "./ViewGrid/Navbar";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const CustomerView = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Grids />
    </>
  );
};

export default CustomerView;
