import React, { useContext, useEffect, useRef, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Link,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

import { auth } from "../../Main-Redux/FireBase/fireBaseConfig";
import { GlobalContext } from "../CustomerViewPage/ViewGrid/Context/Context";
import { toast } from "react-toastify";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [Ac_number, setAc_number] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [filled, setFilled] = useState(false);
  const navigate = useNavigate();

  const animationProps = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  });

  const { getStored, setUserLoggedIn } = useContext(GlobalContext);
  const getFromLocalStorage = localStorage.getItem("acNumber");
  const getlog = JSON.parse(getFromLocalStorage);

  useEffect(() => {
    if (Ac_number !== "") {
      setFilled(false);
    } else {
      setFilled(true);
    }
  }, [Ac_number, getlog]);
  useEffect(() => {
    if (getlog !== "") {
      setFilled(false);
    } else {
      setFilled(true);
    }
  }, [getlog]);

  const copyToClipboard = () => {
    const copie = navigator.clipboard
      .writeText(Ac_number)
      .then(() => alert(`Copied to clipboard! ${Ac_number}`))
      .catch((err) => console.error("Failed to copy:", err));
    copie ? setIsCopied(true) : setIsCopied(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const filtering = getStored.find(
        (ite) => Number(ite.Ac_number) === Number(getlog ? getlog : Ac_number)
      );
      console.log(getStored);

      if (filtering) {
        const createAuth = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (isCopied) {
          if (createAuth) {
            localStorage.setItem("user_data", JSON.stringify(filtering));
            alert(``);
            navigate("/home");
            setUserLoggedIn(true);
          } else {
            toast.error("InValid email or password");
            setUserLoggedIn(false);
          }
        } else {
          toast.error("Must be copied!");
        }
      } else {
        toast.error(
          `Account number is not valid, please try again ${Ac_number}`
        );
      }
    } catch (err) {
      navigate("/");
      setError(err.message);
      console.log(err.message);
    }
  };
  console.log(filled);

  return (
    <animated.div style={animationProps}>
      <Container maxWidth="xs" className="animate__animated animate__fadeIn">
        <Paper elevation={3} style={{ padding: "2rem", marginTop: "4rem" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Create Account
          </Typography>
          <form onSubmit={handleSignup}>
            <TextField
              fullWidth
              label="Account number"
              variant="outlined"
              margin="normal"
              type="number"
              name="Ac_number"
              value={getlog ? Number(getlog) : Ac_number}
              disabled={getlog && getlog}
              required
              onChange={(e) => setAc_number(e.target.value)}
            />
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                onClick={copyToClipboard}
                variant="outlined"
                disabled={filled ? true : false}
              >
                {isCopied ? "✓" : "Copy"}
              </Button>
              <Typography variant="body2">
                &#60; Copy this {Ac_number.length}
              </Typography>
            </span>

            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              required
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              required
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              Sign Up
            </Button>
          </form>
          <Typography align="center" style={{ marginTop: "1rem" }}>
            Already have an account?{" "}
            <Link href="/" underline="hover">
              Login
            </Link>
          </Typography>
        </Paper>
      </Container>
    </animated.div>
  );
};

export default Signup;
