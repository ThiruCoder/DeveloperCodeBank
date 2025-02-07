import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import Navbar from "../ViewGrid/Navbar";

const CustomerAccount = ({ dp }) => {
  const [index, setIndex] = useState(0);

  const swipeAnimation = useSpring({
    transform: `translateX(${index * -100}%)`,
    config: { tension: 300, friction: 20 },
  });
  const data = [dp.balance, dp.lastName];
  const accountData = [
    {
      id: 1,
      name: "Saving Balance",
      balance: `${data[0]}`,
      color: "#203061",
    },
    { id: 2, name: "Checking Account", balance: "----", color: "#892c3e" },
    { id: 3, name: "Bussiness Card", balance: "----", color: "#954977" },
  ];

  const nextCard = () =>
    setIndex((prev) => (prev < accountData.length - 1 ? prev + 1 : prev));
  const prevCard = () => setIndex((prev) => (prev > 0 ? prev - 1 : prev));

  return (
    <>
      <Navbar />
      <AppBar position="static" sx={{ backgroundColor: "#333" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
          <Typography variant="h6">Customer Accounts</Typography>
          <Typography variant="h6">{dp.Ac_number}</Typography>
        </Toolbar>
      </AppBar>
      <Container
        style={{ textAlign: "center", marginTop: 50, marginBottom: 30 }}
      >
        <div
          style={{
            display: "flex",
            overflow: "hidden",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <animated.div
            style={{ ...swipeAnimation, display: "flex", width: "300px" }}
          >
            {accountData.map((account) => (
              <Card
                key={account.id}
                sx={{
                  minWidth: 275,
                  margin: "0 10px",
                  backgroundColor: account.color,
                  color: "#fff",
                  padding: "20px",
                }}
              >
                <CardContent>
                  <Typography variant="h5">{account.name}</Typography>
                  <Typography variant="h6">
                    &#8377; {account.balance}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </animated.div>
        </div>
        <div style={{ marginTop: 20 }}>
          <Button
            onClick={prevCard}
            disabled={index === 0}
            variant="contained"
            color="primary"
            sx={{ marginRight: 2 }}
          >
            <ArrowBack /> Prev
          </Button>
          <Button
            onClick={nextCard}
            disabled={index === accountData.length - 1}
            variant="contained"
            color="primary"
          >
            Next <ArrowForward />
          </Button>
        </div>
      </Container>
    </>
  );
};

export default CustomerAccount;
