import React from "react";
import { Container, CssBaseline } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import Footer from "./Footer";

const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Header />
      <div className="app-body">
        <Sidebar />
        <MainContent />
        asdfasdjfkj
      </div>
      <Footer />
    </Container>
  );
};
``;

export default Dashboard;
