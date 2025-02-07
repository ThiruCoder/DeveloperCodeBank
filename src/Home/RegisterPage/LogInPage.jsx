import React, { useContext, useEffect, useRef, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import icon from "../assets/undraw_uploading_za50.png";
import icon1 from "../assets/undraw_moving-forward_md35.png";
import icon2 from "../assets/pushIconForm.png";

import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Link,
  Input,
  Box,
  Grid,
  CardMedia,
  Card,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import {
  doPasswordReset,
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../Main-Redux/FireBase/FirebaseAuth";

import { GlobalContext } from "../CustomerViewPage/ViewGrid/Context/Context";
import { useDispatch } from "react-redux";
import { LoginAction } from "../../Main-Redux/ReduxReducers/Actions/LogInActions";
import { login_User } from "../../Main-Redux/ReduxReducers/Reducers/CreateAnAccount";
import { toast } from "react-toastify";
import { auth } from "../../Main-Redux/FireBase/fireBaseConfig";

const LogInPage = () => {
  const initialObjs = {
    email: "",
    password: "",
    Ac_number: "",
  };
  const [logInFormData, setLoginFormData] = useState(initialObjs);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [googleError, setgoogleError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [emailMessage, setEmailMessage] = useState(false);

  const [filtered, setFiltered] = useState([]);

  const { getStored, userLoggedIn, setUserLoggedIn } =
    useContext(GlobalContext);
  const acInput = useRef(null);
  const animationProps = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...logInFormData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filtering = getStored.find(
      (filterItem) =>
        Number(filterItem.Ac_number) === Number(logInFormData.Ac_number)
    );

    if (filtering) {
      try {
        const logIn = await doSignInWithEmailAndPassword(
          logInFormData.email,
          logInFormData.password
        );
        if (logIn && logIn.user) {
          setFiltered({ ...filtering });

          localStorage.setItem("user_data", JSON.stringify(filtering));
          dispatch(login_User(filtering));
          toast.success(
            `Wellcome to Fancybank ${filtering.firstName} ${filtering.lastName}`
          );
          navigate("/home");
        } else {
          // If logIn object exists but doesn't have a user, log the error
          setError("Invalid email or password");

          console.log("Login failed: No user returned");
        }

        return logIn;
      } catch (error) {
        setError("Invalid email or password");
        console.log(error.message);
      }
    } else {
      setError(
        `Account number is invalid, Please try again : ${logInFormData.Ac_number}`
      );
    }
  };

  const handleForgot = (e) => {
    e.preventDefault();
    acInput.current.style.display = "flex";
    try {
      const resetPassword = doPasswordReset(logInFormData.email);
      if (resetPassword) {
        return setEmailMessage(true);
      }
    } catch (error) {
      console.log(error);

      if (error.code === "auth/user-not-found") {
        toast.error("User is not found, try again");
        setEmailMessage(false);
      }
    }
  };

  // const signInWithGoogle = async () => {
  //   acInput.current.style.display = "flex";

  //   const filtering = getGtored.find(
  //     (filterItem) => filterItem.Ac_number === Number(logInFormData.Ac_number)
  //   );

  //   if (filtering) {
  //     try {
  //       await doSignInWithGoogle();
  //       navigate("/home");
  //     } catch (error) {
  //       setError("Invalid email and password");
  //       console.log(error);
  //     }
  //   } else {
  //     setError(
  //       "Entering account number is invalid :",
  //       logInFormData?.Ac_number
  //     );
  //   }
  // };

  return (
    <>
      <CardMedia
        component="img"
        className="animate__animated animate__shakeX"
        sx={{
          height: "100%",
          width: "100%",
          minWidth: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: -1,
        }}
        src={icon2}
      />

      <Box sx={{ zIndex: 2 }}>
        <animated.div style={animationProps}>
          <Container className="animate__animated animate__fadeIn">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Paper
                elevation={8}
                style={{
                  padding: "2rem",
                  marginTop: "4rem",
                  WebkitBackgroundClip: "revert-layer",
                  WebkitMaskImage: "none",
                  width: 300,
                }}
              >
                <Typography variant="h4" align="center" gutterBottom>
                  Bank Login
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Account number"
                    variant="outlined"
                    type="number"
                    margin="normal"
                    name="Ac_number"
                    required
                    value={logInFormData.Ac_number}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    type="email"
                    margin="normal"
                    name="email"
                    required
                    value={logInFormData.email}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    margin="normal"
                    name="password"
                    value={logInFormData.password}
                    onChange={handleChange}
                    required
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  />
                  {error && (
                    <Typography color="error" variant="body2">
                      {error}
                    </Typography>
                  )}
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginTop: "1rem" }}
                  >
                    Login
                  </Button>
                </form>
                <Typography align="center" style={{ marginTop: "1rem" }}>
                  Don't have an account?{" "}
                  <Link href="/newUser" underline="hover" ml={1}>
                    Create new account
                  </Link>
                </Typography>
              </Paper>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {emailMessage ? (
                <Typography>Email has been sent, Check your inbox</Typography>
              ) : (
                <form action="" onSubmit={handleForgot}>
                  <Paper sx={{ mt: 1, width: 350 }}>
                    {googleError && (
                      <Typography color="error" variant="body2">
                        {googleError}
                      </Typography>
                    )}

                    <Box
                      className="animate__animated animate__fadeInUp"
                      sx={{
                        display: "none",
                        justifyContent: "center",
                        alignItems: "center",
                        pb: 1,
                        pt: 2,
                      }}
                      ref={acInput}
                    >
                      <Input
                        fullWidth
                        label="Email"
                        variant="outlined"
                        placeholder="Enter Email"
                        sx={{
                          width: "70%",
                          pl: 1,
                          transition: "0.5s ease-in",
                        }}
                        type="email"
                        margin="normal"
                        name="email"
                        value={logInFormData.email}
                        onChange={handleChange}
                      />
                    </Box>
                    <Button type="submit" height={90} fullWidth>
                      Forgot password
                    </Button>
                  </Paper>
                </form>
              )}
            </Box>
          </Container>
        </animated.div>
      </Box>
    </>
  );
};

export default LogInPage;
