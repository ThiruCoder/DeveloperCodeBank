import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import icon from "../ViewGrid/assets/iconsTree.svg";

import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import Fingerprint from "@mui/icons-material/Fingerprint";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import AddCardIcon from "@mui/icons-material/AddCard";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "./Context/Context";
import { useDispatch } from "react-redux";
import Swiper from "./OptionalNavbar/SwiperHome";
import SwiperHome from "./OptionalNavbar/SwiperHome";
import FooterHome from "./Footer";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",

  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: "center",
  minHeight: "100vh",
  height: "100%",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1a2027",
  }),
}));

const Grids = () => {
  const matches = useMediaQuery("(min-width:1038px)");
  const [isToggled, setIsToggled] = useState(true);
  // const [firebaseData, setFirebaseData] = useState([]);

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState([]);
  const [afterFilter, setAfterFilter] = useState(null);
  const { getStored } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getStorage = localStorage.getItem("user_data");
    try {
      const refAc = JSON.parse(getStorage);
      setLoginData(Array.isArray(refAc) ? refAc : [refAc]);
    } catch (error) {
      console.error("Error parsing localStorage data :", error);
      setLoginData([]);
    }
  }, []);

  useEffect(() => {
    if (!getStored || getStored.length === 0) {
      console.log("No data available");
      return;
    }

    const dataArray = Array.isArray(getStored)
      ? getStored
      : Object.values(getStored);

    const logInAccountNumber =
      loginData.length > 0 ? Number(loginData[0].Ac_number) : null;

    const filtering = dataArray.find(
      (ite) => Number(ite.Ac_number) === logInAccountNumber
    );

    if (filtering) {
      const transData = [];
      transData.push(filtering);
      setAfterFilter(transData);

      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [getStored, loginData]);

  const accordionRef = useRef(null);
  const handleAccordionChange = (isExpanded) => {
    if (isExpanded && accordionRef.current) {
      accordionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const balance = [
    <Accordion
      sx={{ width: "18.8rem", position: "relative", top: "20px" }}
      slotProps={{
        heading: { component: "h4" },
        transition: { unmountOnExit: true },
      }}
      ref={accordionRef}
      onChange={(event, isExpanded) => handleAccordionChange(isExpanded)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{ position: "fixeed" }}
      >
        <CardHeader
          title="Balance"
          action={
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="fingerprint"
                color={isToggled ? "secondary" : "success"}
                flag="false"
                onClick={handleToggle}
                sx={{
                  transition: "0.4s ease-in-out",
                  position: "absolute",
                  right: "50px",
                }}
              >
                {isToggled ? (
                  <Fingerprint />
                ) : (
                  <span
                    style={{
                      display: "inline-flex",
                      flexDirection: "row",
                      transition: "0.4s ease-in",
                      marginRight: "6px",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Box>
                      <Fingerprint />
                    </Box>
                    <Box>
                      {afterFilter?.length > 0
                        ? afterFilter?.map((item, id) => (
                            <Typography variant="body1" key={id} ml={1}>
                              &#8377; {item.balance}
                            </Typography>
                          ))
                        : null}
                    </Box>
                  </span>
                )}
              </IconButton>
            </Stack>
          }
          sx={{
            width: matches ? "15rem" : "11rem",
          }}
        />
      </AccordionSummary>
      <Divider />
      <AccordionDetails
        sx={{
          height: "3rem",
          display: "flex",
          flexDirection: "row",
          gap: "8px",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<TransferWithinAStationIcon />}
          sx={{ width: "50%" }}
        >
          Withdraw
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button
          variant="outlined"
          startIcon={<AddCardIcon />}
          onClick={() => navigate("/deposit")}
          sx={{ width: "50%" }}
        >
          Deposit
        </Button>
      </AccordionDetails>
    </Accordion>,
  ];

  return (
    <>
      <Container>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 9 }}>
          <Grid item xs={12} xl={10} md={8} mt={9}>
            <CardMedia
              component="img"
              width={800}
              image={icon}
              alt="Paella dish"
            />

            <Divider orientation="vertical" flexItem />
            {/* <img src={icon} alt="" width={matches ? 600 : 400} /> */}
          </Grid>

          <Grid item xs={12} xl={12} md={4} mt={4}>
            <Item variant="h3">
              <CardHeader
                title="Account Details"
                variant="overline"
                fontWeight={700}
                fontSize={"clamp(1rem, 10vw, 2rem); "}
                subheader="Confidential move on details"
                action={
                  <IconButton aria-label="settings">
                    <FormatAlignLeftIcon />
                  </IconButton>
                }
                onPointerEnter={() => {
                  console.log("1");
                }}
              />

              <Grid
                container
                spacing={2}
                display={"flex"}
                justifyContent={"space-around"}
              >
                <Grid>
                  {balance}
                  <CardContent>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Button>Details </Button>
                          </TableCell>
                          <TableCell>
                            <Button>Codes</Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    {afterFilter?.length > 0
                      ? afterFilter?.map((ite, index) => (
                          <Box
                            sx={{
                              flexDirection: "column",
                              justifyContent: "flex-start",
                            }}
                            display={"flex"}
                            justifyContent={"flex-start"}
                            mt={2}
                          >
                            <Box display={"flex"} flexDirection={"row"} pb={2}>
                              <Typography variant="body1">
                                Account Number :
                              </Typography>
                              <Typography
                                key={index}
                                variant="body2"
                                mt={0.4}
                                ml={1.5}
                              >
                                {ite?.Ac_number}
                              </Typography>
                            </Box>
                            <Box display={"flex"} flexDirection={"row"} pb={2}>
                              <Typography variant="body1">
                                Full Name :
                              </Typography>
                              <Typography
                                variant="body2"
                                mt={0.4}
                                ml={3}
                                whiteSpace={"nowrap"}
                                overflow={"hidden"}
                                width={140}
                                textOverflow={"ellipsis"}
                              >
                                {ite?.firstName} {ite?.lastName}
                              </Typography>
                            </Box>
                            <Box display={"flex"} flexDirection={"row"} pb={2}>
                              <Typography variant="body1">Age :</Typography>
                              <Typography variant="body2" mt={0.4} ml={1.5}>
                                {ite?.age} {ite?.lastName}
                              </Typography>
                            </Box>
                            <Box display={"flex"} flexDirection={"row"} pb={2}>
                              <Typography variant="body1">Married :</Typography>
                              <Typography variant="body2" mt={0.4} ml={1.5}>
                                {ite?.married}
                              </Typography>
                            </Box>
                            <Box display={"flex"} flexDirection={"row"} pb={2}>
                              <Typography variant="body1">Nominee :</Typography>
                              <Typography variant="body2" mt={0.4} ml={1.5}>
                                {ite?.nominee}
                              </Typography>
                            </Box>
                          </Box>
                        ))
                      : null}
                  </CardContent>
                </Grid>
                {/* <Grid
                  md={4}
                  mb={8}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  flexDirection={"column"}
                >
                  
                </Grid> */}
              </Grid>
            </Item>
          </Grid>
        </Grid>
        <Grid>
          {" "}
          <SwiperHome />
        </Grid>
      </Container>
      <FooterHome />
    </>
  );
};

export default Grids;
