import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  LinearProgress,
  Chip,
  IconButton,
  useTheme,
  Divider,
  TableBody,
  Table,
  TableCell,
} from "@mui/material";
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
import { GlobalContext } from "../ViewGrid/Context/Context";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { useSpring, animated } from "@react-spring/web";
import {
  AccountBalance,
  Person,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";
import CustomerAccount from "./AccountDetailing";

//   interface Transaction {
//     id: number;
//     type: string;
//     amount: number;
//     description: string;
//     date: string;
//   }

const UserDatails = () => {
  const [form, setForm] = useState({ sender: "", receiver: "", amount: "" });
  const [localUser, setLocalUser] = useState([]);
  const [pendingLocalUser, setPendingLocalUser] = useState(false);
  const [passedData, setPassedData] = useState(false);

  const { getStored } = useContext(GlobalContext);
  const theme = useTheme();

  useEffect(() => {
    const getuserFromLocalStorage = localStorage.getItem("user_data");
    try {
      if (getuserFromLocalStorage) {
        setPendingLocalUser(true);
        const referToState = JSON.parse(getuserFromLocalStorage);
        setPassedData(referToState);
        const localStorageArray = Array.isArray(referToState)
          ? referToState
          : [referToState];

        if (localStorageArray) {
          const filteringLocalStorage = getStored.find(
            (ite) => ite.Ac_number == localStorageArray[0].Ac_number
          );
          const convertingToArray = Array.isArray(filteringLocalStorage)
            ? filteringLocalStorage
            : [filteringLocalStorage];

          setLocalUser(convertingToArray);
        } else {
          setLocalUser(convertingToArray);
        }
      } else {
        setPendingLocalUser(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  const UserDetailsPage = () => {
    return (
      <>
        <Container className="animate__animated animate__fadeIn">
          {localUser && localUser?.length > 0
            ? localUser?.map((item, index) => (
                <Card className="animate__animated animate__fadeInUp">
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={4}>
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          flexDirection={"column"}
                          mt={12}
                        >
                          <Avatar
                            alt={item?.firstName}
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 150, height: 150 }}
                          />
                          <Box
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            mt={4}
                            gap={5}
                          >
                            <Typography>Account number</Typography>
                            <Typography>{item?.Ac_number}</Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={8}
                        sx={{ display: "flex", flexDirection: "row" }}
                      >
                        <Grid md={6}>
                          <Box
                            display={"flex"}
                            justifyContent={"center"}
                            mt={8}
                            flexDirection={"column"}
                            gap={2}
                            mr={2}
                          >
                            <Table>
                              <TableBody>
                                <TableCell>
                                  <Typography
                                    variant="subtitle1"
                                    fontSize={15}
                                    fontWeight={10}
                                  >
                                    FULL NAME
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="subtitle2"
                                    fontSize={16}
                                    fontWeight={3}
                                  >
                                    {item?.firstName} {item?.lastName}
                                  </Typography>
                                </TableCell>
                              </TableBody>
                              <TableBody>
                                <TableCell>
                                  <Typography
                                    variant="subtitle1"
                                    fontSize={15}
                                    fontWeight={10}
                                  >
                                    FATHER NAME
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="subtitle2"
                                    fontSize={16}
                                    fontWeight={3}
                                  >
                                    {item?.fname}
                                  </Typography>
                                </TableCell>
                              </TableBody>
                              <TableBody>
                                <TableCell>
                                  <Typography
                                    variant="subtitle1"
                                    fontSize={15}
                                    fontWeight={10}
                                  >
                                    PHONE
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="subtitle2"
                                    fontSize={16}
                                    fontWeight={3}
                                  >
                                    {item?.phone}
                                  </Typography>
                                </TableCell>
                              </TableBody>
                              <TableBody>
                                <TableCell>
                                  <Typography
                                    variant="subtitle1"
                                    fontSize={15}
                                    fontWeight={10}
                                  >
                                    DATE OF BIRTH
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="subtitle2"
                                    fontSize={16}
                                    fontWeight={3}
                                  >
                                    {item?.dob}
                                  </Typography>
                                </TableCell>
                              </TableBody>
                            </Table>
                          </Box>
                        </Grid>
                        <Divider orientation="vertical" sx={{ mt: 5 }} />
                        <Grid md={6}>
                          <Box
                            display={"flex"}
                            justifyContent={"center"}
                            mt={8}
                            flexDirection={"column"}
                            gap={2}
                            ml={2}
                          >
                            <Table>
                              <TableBody>
                                <TableCell>
                                  <Typography
                                    variant="subtitle1"
                                    fontSize={15}
                                    fontWeight={10}
                                  >
                                    ADDRESS
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="subtitle2"
                                    fontSize={16}
                                    fontWeight={3}
                                  >
                                    {item?.address}
                                  </Typography>
                                </TableCell>
                              </TableBody>
                              <TableBody>
                                <TableCell>
                                  <Typography
                                    variant="subtitle1"
                                    fontSize={15}
                                    fontWeight={10}
                                  >
                                    ACCOUNT TYPE
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="subtitle2"
                                    fontSize={16}
                                    fontWeight={3}
                                  >
                                    {item?.acType}
                                  </Typography>
                                </TableCell>
                              </TableBody>
                              <TableBody>
                                <TableCell>
                                  <Typography
                                    variant="subtitle1"
                                    fontSize={15}
                                    fontWeight={10}
                                  >
                                    MARRIED
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="subtitle2"
                                    fontSize={16}
                                    fontWeight={3}
                                  >
                                    {item?.married}
                                  </Typography>
                                </TableCell>
                              </TableBody>
                              <TableBody>
                                <TableCell>
                                  <Typography
                                    variant="subtitle1"
                                    fontSize={15}
                                    fontWeight={10}
                                  >
                                    NOMINEE
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="subtitle2"
                                    fontSize={16}
                                    fontWeight={3}
                                  >
                                    {item?.nominee}
                                  </Typography>
                                </TableCell>
                              </TableBody>
                            </Table>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider variant="middle" orientation="vertical" />
                    <Grid container spacing={3} sx={{ marginTop: 2 }}>
                      <Grid item xs={12}></Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))
            : null}
        </Container>
      </>
    );
  };

  // Spring animation for smooth card hover
  const cardSpring = useSpring({
    from: { transform: "scale(1)" },
    to: { transform: "scale(1.05)" },
    reset: true,
    reverse: true,
    config: { tension: 200, friction: 10 },
  });

  return (
    <>
      <Box sx={{ bgcolor: "grey.50", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="lg">
          {/* Header */}

          {/* Main Stats */}
          <Grid container spacing={3}>
            {/* Total Balance */}

            <CustomerAccount dp={passedData} />

            {/* Loan Amount */}
            <UserDetailsPage />

            {/* <Box
              className="animate__animated animate__fadeIn"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
                padding: 2,
              }}
            >
              <animated.div style={cardSpring}>
                <Card
                  sx={{
                    maxWidth: 400,
                    padding: 3,
                    borderRadius: 3,
                    boxShadow: 4,
                    backgroundColor: "#fff",
                  }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mb: 2 }}
                  >
                    <Avatar
                      sx={{ bgcolor: "primary.main", width: 80, height: 80 }}
                    >
                      {user.name.charAt(0)}
                    </Avatar>
                  </Box>

                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      {user.name}
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                      <Typography
                        variant="body1"
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <AccountBalanceWallet color="primary" /> Account:{" "}
                        {user.accountNumber}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 1,
                        }}
                      >
                        <AccountBalanceWallet color="success" /> Balance:{" "}
                        {user.balance}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 1,
                        }}
                      >
                        <Email color="error" /> {user.email}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 1,
                        }}
                      >
                        <Phone color="secondary" /> {user.phone}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </animated.div>
            </Box> */}
            {/* <Grid item xs={12} md={6} lg={3}>
              <Card
                className={`${animationClass} animate__delay-3s`}
                sx={{
                  height: "100%",
                  background: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
                  color: "white",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box>
                      <Typography variant="overline" sx={{ opacity: 0.8 }}>
                        Total Loans
                      </Typography>
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        $12,000
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          Repayment Progress
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={65}
                          sx={{
                            mt: 0.5,
                            bgcolor: "rgba(255,255,255,0.2)",
                            "& .MuiLinearProgress-bar": {
                              bgcolor: "white",
                            },
                          }}
                        />
                      </Box>
                    </Box>
                    <Avatar sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }}>
                      <LocalAtmIcon />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid> */}

            {/* Investment Funds */}
            {/* <Grid item xs={12} md={6} lg={3}>
              <Card
                className={`${animationClass} animate__delay-4s`}
                sx={{
                  height: "100%",
                  background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                  color: "white",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box>
                      <Typography variant="overline" sx={{ opacity: 0.8 }}>
                        Investment Funds
                      </Typography>
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        $8,750
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ mt: 1, display: "flex", alignItems: "center" }}
                      >
                        <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        +8.2% Return
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }}>
                      <AccountBalanceWalletIcon />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid> */}

            {/* Total Transactions */}
            {/* <Grid item xs={12} md={6} lg={3}>
              <Card
                className={`${animationClass} animate__delay-5s`}
                sx={{
                  height: "100%",
                  background: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`,
                  color: "white",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box>
                      <Typography variant="overline" sx={{ opacity: 0.8 }}>
                        Monthly Transactions
                      </Typography>
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        156
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Last updated today
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }}>
                      <PaymentIcon />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid> */}
          </Grid>

          {/* Recent Transactions */}
        </Container>
      </Box>
    </>
  );
};

export default UserDatails;
