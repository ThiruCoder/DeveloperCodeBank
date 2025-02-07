import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
  IconButton,
  ListItemIcon,
  Avatar,
  Card,
  CardContent,
  Grid,
  TableHead,
  Table,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { useSpring, animated } from "react-spring";
import {
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  Payment as PaymentIcon,
  Receipt as ReceiptIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  AttachMoney as AttachMoneyIcon,
  LocalAtm as LocalAtmIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  MoreVert as MoreVertIcon,
  AccountBalanceWallet,
} from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Navbar from "../ViewGrid/Navbar";
import { database } from "../../../Main-Redux/FireBase/fireBaseConfig";
import { get, ref } from "firebase/database";
import { GlobalContext } from "../ViewGrid/Context/Context";
import Deposit from "./Deposit";

const TransactionHistory = () => {
  const [animate, setAnimate] = useState(false);
  const [trxData, setTrxData] = useState(null);
  const [localUser, setLocalUser] = useState([]);

  console.log("localUser:", localUser);
  useEffect(() => {
    setAnimate(true);
  }, []);
  const { setLoginUserData } = useContext(GlobalContext);
  const animationClass = animate ? "animate__animated animate__fadeIn" : "";

  useEffect(() => {
    const TransactionHistory = async () => {
      const db = database;
      const refTransactionData = ref(db, "customAc/Transaction");

      const getTransactionData = await get(refTransactionData);
      try {
        if (getTransactionData.exists()) {
          const objTransactionData = Object.values(getTransactionData.val());
          const getLocalUser = localStorage.getItem("user_data");
          const parsed = JSON.parse(getLocalUser);

          const localNum = parsed.Ac_number;

          if (objTransactionData) {
            const historyFilter = objTransactionData.filter(
              (ite) => Number(ite?.sender_Ac_number) === Number(localNum)
            );

            if (historyFilter) {
              setTrxData(historyFilter);
              localStorage.setItem(
                "localTrxHistory",
                JSON.stringify(historyFilter)
              );
            }
          }
          console.log("objTransactionData", objTransactionData);
        } else {
          console.log("Data is not valid");
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    TransactionHistory();
  }, []);

  return (
    <>
      <Navbar />
      <Paper sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Transaction History
        </Typography>
      </Paper>

      <Grid container spacing={2}>
        <Grid md={1} sm={1} xs={0}></Grid>
        <Grid md={10} sm={10} xs={12} ml={1.4}>
          <Card
            sx={{ mt: 4 }}
            className={`${animationClass} animate__delay-6s`}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">Recent Transactions</Typography>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Box>
              <List>
                <Table>
                  <TableHead>
                    <TableCell sx={{ fontWeight: 600, fontSize: 16 }}>
                      Transaction Id
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>
                      Sender Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>
                      Recipient Name
                    </TableCell>

                    <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>
                      Amount
                    </TableCell>
                  </TableHead>
                  {trxData && trxData?.length > 0
                    ? trxData.map((tr, index) => (
                        <TableBody>
                          <TableCell>
                            <Typography variant="body1" key={index}>
                              {tr?.trxId}
                            </Typography>
                            <Typography variant="body2" fontSize={12}>
                              {tr?.date}
                            </Typography>
                          </TableCell>
                          <TableCell>{tr?.senderName}</TableCell>
                          <TableCell>{tr?.recipientName}</TableCell>
                          <TableCell>&#8377; {tr?.trxAmount}</TableCell>
                        </TableBody>
                      ))
                    : null}

                  {/* <Box display={"flex"} justifyContent={"space-between"} mx={5}>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      flexDirection={"row"}
                    >
                      <Box>
                        <Typography variant="body1">{tr?.trxId}</Typography>
                        <Typography variant="body2">{tr?.date}</Typography>
                      </Box>

                      <Typography variant="subtitle1" mx={4}>
                        {tr?.senderName}
                      </Typography>
                      <Typography variant="subtitle1" mx={4}>
                        {tr?.recipientName}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {tr?.trxAmount}
                      </Typography>
                    </Box>
                  </Box> */}
                </Table>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid md={1} sm={1} xs={0}></Grid>
      </Grid>
    </>
  );
};

const TransactionItem = ({ transaction, index }) => {
  // Animation for each list item
  const itemAnimation = useSpring({
    from: { opacity: 0, transform: "translate3d(-50px, 0, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: index * 100,
    config: { duration: 300 },
  });

  return (
    <animated.div style={itemAnimation}>
      <ListItem>
        <ListItemText
          primary={transaction.description}
          secondary={`Amount: $${transaction.amount.toFixed(2)}`}
          style={{ color: transaction.amount < 0 ? "red" : "green" }}
        />
      </ListItem>
    </animated.div>
  );
};

export default TransactionHistory;
