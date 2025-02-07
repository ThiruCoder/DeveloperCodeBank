import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  IconButton,
  InputAdornment,
  CircularProgress,
  Alert,
  ButtonGroup,
} from "@mui/material";
import {
  Person as PersonIcon,
  SwapHoriz as SwapHorizIcon,
  AccountBalance as AccountBalanceIcon,
  Check as CheckIcon,
  ArrowForward as ArrowForwardIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useSpring, animated } from "@react-spring/web";
import { database } from "../../../Main-Redux/FireBase/fireBaseConfig";
import { get, getDatabase, push, ref, update } from "firebase/database";
import { GlobalContext } from "../ViewGrid/Context/Context";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../ViewGrid/Navbar";

const AnimatedPaper = animated(Paper);

function MoneyTransferPage({ transData }) {
  const [activeStep, setActiveStep] = useState(0);
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isResValid, setIsResValid] = useState(false);
  const [filteredObj, setFilteredObj] = useState([]);
  const [fakeError, setFakeError] = useState(false);

  const [filteredData, setFilteredData] = useState(null);
  const [completeTrx, setCompleteTrx] = useState(false);
  const [confirmTrx, setConfirmTrx] = useState(false);

  const { loginUserData, getStored, getStoreKeys } = useContext(GlobalContext);

  const navigate = useNavigate();
  useEffect(() => {
    const data = [];
    data.push(loginUserData);
    setFilteredData(data);
  }, [loginUserData]);

  async function TransferCustomers({ filteredData, getStored }) {
    if (!filteredData || filteredData === "" || filteredData === null) {
      console.error("Filtered data is none");
    }
    const logInAccountNumber =
      filteredData.length > 0 ? Number(filteredData[0].Ac_number) : null;

    if (!getStored || getStored.length === 0) {
      navigate("/home");
      console.error("Error: getGtored is empty or undefined.");
      return;
    }
    const filtering = getStored.filter(
      (item) => Number(item.Ac_number) !== logInAccountNumber
    );
    if (filtering) {
      setUserData(filtering);
    } else {
      console.log("remaining filters", filtering);
    }
  }

  useEffect(() => {
    TransferCustomers({ getStored, filteredData });
  }, [filteredData, getStored]);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 280, friction: 20 },
  });

  const steps = ["Enter Amount", "Select Recipient", "Confirm Transfer"];
  function handleTranfer() {}
  useEffect(() => {
    if (success) {
      setConfirmTrx(true);
    } else {
      setConfirmTrx(false);
    }

    if (!success) {
      setConfirmTrx(false);
    } else {
      setConfirmTrx(true);
    }
  }, [success]);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setLoading(true);
      // Simulate transfer process
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 2000);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  function backToHome() {
    setConfirmTrx(false);
    navigate("/home");
  }

  const handleBack = () => {
    setConfirmTrx(false);
    setActiveStep((prev) => prev - 1);
  };

  function maskedAccountNumber(account_number) {
    if (!account_number) return "******";
    return "******" + account_number.toString().slice(-4);
  }

  // ======================= check in search ====================

  useEffect(() => {
    const fullName = userData.findIndex(
      (ite) =>
        `${ite.firstName} ${ite.lastName}`.toLowerCase() ===
        recipient.toLowerCase()
    );
    const isIncludes = userData.filter((ite) =>
      `${ite.firstName} ${ite.lastName}`
        .toLowerCase()
        .includes(recipient.toLowerCase())
    );
    setFilteredObj(isIncludes);
    console.log("isIncludes:", filteredObj);

    if (fullName === -1) {
      setIsResValid(false);
    } else {
      setIsResValid(true);
    }
  }, [recipient, userData]);

  // =================== Transfer Data Code ==========================

  function randomTransactionId(max, min) {
    return Math.random() * (max - min) + min;
  }

  useEffect(() => {
    let isMounted = true;
    const updateTransaction = async () => {
      try {
        const db = database;

        // Reference to Firebase data
        const refer = ref(db, "customAc/customerAc");
        const geterMaper = await get(refer);

        // Find recipient from userData
        const findRecipient = userData.find(
          (ite) =>
            `${ite.firstName} ${ite.lastName}`.toLowerCase() ===
            recipient.toLowerCase()
        );
        if (!findRecipient) {
          setFakeError(true);
        } else {
          setFakeError(false);
        }

        const localUser = filteredData.map((ite) => ite.Ac_number);

        if (geterMaper.exists()) {
          const accountData = geterMaper.val(); // Get all accounts

          // Find sender & recipient accounts
          const sender = Object.entries(accountData).find(
            ([key, item]) => Number(item.Ac_number) === Number(localUser)
          );
          const recipientData = Object.entries(accountData).find(
            ([key, item]) =>
              Number(item.Ac_number) === Number(findRecipient.Ac_number)
          );

          if (!sender || !recipientData) {
            toast.error("Sender or Recipient account not found");
            return;
          }

          const [senderKey, senderInfo] = sender;
          const [recipientKey, recipientInfo] = recipientData;

          // Transaction amount
          const transactionAmount = Number(amount); // Example: Adjust this dynamically

          if (transactionAmount) {
            // Check sender balance
            if (Number(senderInfo.balance) < transactionAmount) {
              toast.error("Insuffiecient balance !");
              return;
            }

            // Calculate new balances
            const updatedSenderBalance =
              Number(senderInfo.balance) - transactionAmount;
            const updatedRecipientBalance =
              Number(recipientInfo.balance) + transactionAmount;

            // Firebase updates (Atomic transaction)
            const updates = {};
            updates[`customAc/customerAc/${senderKey}/balance`] =
              updatedSenderBalance;
            updates[`customAc/customerAc/${recipientKey}/balance`] =
              updatedRecipientBalance;

            const trxId = Math.floor(
              randomTransactionId(1000000000, 10000000000)
            );

            const transactionHestory = {};
            transactionHestory[`customAc/Transaction`];
            const pusher = push(ref(db, `customAc/Transaction`));
            // const dateZeros = ['01','02','03','04','05',]

            const d = new Date();
            const dy = d.getFullYear();
            const dm = d.getMonth() + 1;
            const dd = d.getDate();
            const ddZeros = dd < 10 ? `0${dd}` : dd;
            const dmZeros = dm < 10 ? `0${dm}` : dm;
            const fullDate = `${dy}-${dmZeros}-${ddZeros}`;

            if (!confirmTrx) {
              setConfirmTrx(false);
            } else {
              await update(ref(db), updates);
              await update(pusher, {
                senderName: `${senderInfo?.firstName} ${senderInfo?.lastName}`,
                recipientName: `${recipientInfo?.firstName} ${recipientInfo?.lastName}`,
                trxAmount: transactionAmount,
                trxId: `Trx${trxId}`,
                date: fullDate,
                sender_Ac_number: senderInfo?.Ac_number,
              });
              toast.success("Transaction is successfully completed...");
            }
          }
        } else {
          toast.error("Your deetails are not available");
        }

        // if (isMounted) {
        //   setIsResValid(findRecipient.length === 0);
        // }
      } catch (error) {
        fakeError ? null : error.message;
      }
    };
    updateTransaction();
    return () => {
      isMounted = false; // Cleanup function
    };
  }, [recipient, userData, confirmTrx]);

  const filteringForButton = userData.filter((ite) => ite.length >= 3);
  console.log(filteringForButton);

  // =================== Transfer Data Code End here ==========================

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Box className="animate__animated animate__fadeIn">
              <Typography variant="h6" gutterBottom>
                How much would you like to send?
              </Typography>
              <TextField
                fullWidth
                label="Amount"
                variant="outlined"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">&#8377;</InputAdornment>
                  ),
                }}
                sx={{ mt: 2 }}
              />
              {filteredData && filteredData?.length > 0
                ? filteredData?.map((item, index) => (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 2 }}
                    >
                      Available balance: &#8377; {item.balance}
                    </Typography>
                  ))
                : null}
            </Box>
          </>
        );
      case 1:
        return (
          <Box className="animate__animated animate__fadeIn">
            <Typography variant="h6" gutterBottom>
              Who are you sending to?
            </Typography>
            <TextField
              fullWidth
              label="Search recipient"
              variant="outlined"
              required
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mt: 2 }}
            />
            <Box sx={{ mt: 3 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Recent Recipients
              </Typography>
              {filteredObj && filteredObj?.length > 0
                ? filteredObj?.map((item, index) => (
                    <>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(min(10rem, 100%), 1fr))",
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Button
                            key={index}
                            variant={
                              recipient === item ? "contained" : "outlined"
                            }
                            sx={{ mr: 1, mb: 1 }}
                            onClick={() =>
                              setRecipient(
                                item?.firstName + " " + item?.lastName
                              )
                            }
                          >
                            <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                              {item?.firstName.charAt(1)} || 'No Contacts'
                            </Avatar>
                            {item?.firstName} {item?.lastName}
                          </Button>
                        </Box>
                      </Box>
                    </>
                  ))
                : null}
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box className="animate__animated animate__fadeIn">
            <Typography variant="h6" gutterBottom>
              Review Transfer Details
            </Typography>
            {filteredData && filteredData.length > 0
              ? filteredData?.map((item, index) => (
                  <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                        <PersonIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1">From</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Your Account ({maskedAccountNumber(item.Ac_number)})
                          {/* <h2>{item?.Ac_number}</h2> */}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton
                      color="primary"
                      sx={{ display: "block", mx: "auto", my: 2 }}
                    >
                      <SwapHorizIcon />
                    </IconButton>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>
                        <AccountBalanceIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1">To</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {recipient}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{ mt: 3, p: 2, bgcolor: "grey.50", borderRadius: 1 }}
                    >
                      <Typography variant="subtitle2" gutterBottom>
                        Amount to Transfer
                      </Typography>
                      <Typography variant="h4" color="primary.main">
                        &#8377;{amount}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        No transfer fee
                      </Typography>
                    </Box>
                  </Paper>
                ))
              : null}
          </Box>
        );
      case 3:
        return (
          <Box>
            <Button variant="outlined">Confirm Transaction</Button>
          </Box>
        );
      default:
        return null;
    }
  };

  if (success) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <AnimatedPaper
          style={fadeIn}
          elevation={3}
          sx={{ p: 4, textAlign: "center" }}
        >
          <Avatar
            sx={{
              mx: "auto",
              mb: 2,
              bgcolor: "success.main",
              width: 60,
              height: 60,
            }}
          >
            <CheckIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h5" gutterBottom>
            Transfer Successful!
          </Typography>
          <Typography color="text.secondary" paragraph>
            You have sent &#8377;{amount} to {recipient}
          </Typography>
          <Alert severity="success" sx={{ mt: 2, mb: 3 }}>
            The money will be available in the recipient's account within 24
            hours.
          </Alert>
          <Box
            display={"flex"}
            flexDirection={"row"}
            gap={2}
            justifyContent={"center"}
          >
            <Button onClick={backToHome} variant="outlined">
              Back to home
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setActiveStep(0);
                setSuccess(false);
                setAmount("");
                setRecipient("");
                setConfirmTrx(false);
              }}
            >
              Make Another Transfer
            </Button>
          </Box>
        </AnimatedPaper>
      </Container>
    );
  }

  return (
    <>
      <Navbar />
      {filteredData?.length > 0
        ? filteredData?.map((item, index) => (
            <Container maxWidth="sm" sx={{ mt: 4 }}>
              <AnimatedPaper style={fadeIn} elevation={3} sx={{ p: 4 }}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ mb: 4 }}
                  className="animate__animated animate__fadeIn"
                >
                  Send Money
                </Typography>

                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                {renderStepContent(activeStep)}

                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}
                >
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mr: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    onChange={handleTranfer}
                    endIcon={
                      loading ? (
                        <CircularProgress size={20} />
                      ) : (
                        <ArrowForwardIcon />
                      )
                    }
                    disabled={
                      loading ||
                      (activeStep === 0 && !amount) ||
                      (activeStep === 1 && !isResValid) ||
                      item?.balance <= amount
                    }
                  >
                    {activeStep === steps.length - 1
                      ? "Confirm Transfer"
                      : "Continue"}
                  </Button>
                </Box>
              </AnimatedPaper>
            </Container>
          ))
        : null}
    </>
  );
}

export default MoneyTransferPage;
