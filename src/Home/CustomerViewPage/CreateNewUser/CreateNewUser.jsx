import React, { useContext, useEffect, useRef, useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  Paper,
  Container,
  Link,
} from "@mui/material";

import { useSpring, animated } from "react-spring";
import { get, getDatabase, push, ref, set } from "firebase/database";
import { app, database } from "../../../Main-Redux/FireBase/fireBaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Signup from "../../RegisterPage/SignInPage";
import { GlobalContext } from "../ViewGrid/Context/Context";
import { makeStyles } from "@mui/styles";

const initialFormData = {
  firstName: "",
  lastName: "",
  fname: "",
  phone: "",
  acType: "",
  address: "",
  dob: "",
  married: "",
  nominee: "",

  agreeToTerms: false,
};

const useStyles = makeStyles({
  p: {
    "&::firstLetter": {
      textTransform: "capitalize",
    },
  },
  textTransform: "capitalize",
});

const CreateNewUser = () => {
  const [isToggle, setIsToggle] = useState(true);

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  // handleSignUpSubmit,
  // isSigned
  const { getGtored, setIsNewAc } = useContext(GlobalContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const classes = useStyles();

  // const allVals = Object.values(snapShot.val());
  // const fills = allVals.filter((vali) => vali.Ac_number === 216842);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const refer = ref(database, "customAc/customerAc");
    try {
      const getuser = get(refer);
      if ((await getuser).exists()) {
        const forFilter = Object.values((await getuser).val());
        const filteringData = forFilter.find(
          (filterer) => filterer.phone == Number(formData.phone)
        );

        console.log(filteringData);

        if (!filteringData) {
          const newDoc = push(ref(database, "customAc/customerAc"));
          const bal = 0;
          const acNumber = Math.floor(getRandomNumber(100000000, 1000000000));

          localStorage.setItem("acNumber", JSON.stringify(acNumber));
          setIsNewAc(true);
          set(newDoc, {
            Ac_number: acNumber,

            balance: Number(bal.toFixed(2)),
            ...formData,
            phone: Number(formData.phone),
          })
            .then(() => {
              alert("Data saved successfully");
            })
            .catch((error) => {
              alert("error :", error.message);
            });
          navigate("/signUp");
          window.location.reload();
          toast.success("SignUp to complete an account create");
        } else {
          toast.error(
            "Below credentials are already existed, Please provide valid info..."
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formBack = () => {
    setIsToggle(true);
  };

  const validateForm = () => {
    if (formData.firstName !== "") {
      if (formData.lastName !== "") {
        if (formData.email !== "") {
          if (formData.phone !== "") {
            if (formData.acType !== "") {
              setIsToggle(!isToggle);
            }
          }
        }
      }
    }
  };

  const animationProps = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  });

  return (
    <>
      <animated.div style={animationProps}>
        <Box
          sx={{
            maxWidth: 600,
            margin: "auto",
            padding: 4,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" gutterBottom textAlign="center">
            Bank Account Registration
          </Typography>
          <form onSubmit={handleSubmit}>
            {isToggle ? (
              <Box className="animate__animated animate__flipInX">
                {/* First Name */}
                <TextField
                  label="First Name"
                  name="firstName"
                  className={classes.p}
                  value={formData.firstName}
                  onChange={handleChange}
                  inputProps={{ style: { textTransform: "capitalize" } }}
                  fullWidth
                  margin="normal"
                  required
                />

                {/* Last Name */}
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  sx={{ textTransform: "capitalize" }}
                  inputProps={{ style: { textTransform: "capitalize" } }}
                  fullWidth
                  margin="normal"
                  required
                />

                {/* Email */}
                <TextField
                  label="Father fullname"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  inputProps={{ style: { textTransform: "capitalize" } }}
                  type="text"
                  fullWidth
                  margin="normal"
                  required
                />

                {/* Phone */}
                <TextField
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  fullWidth
                  margin="normal"
                  required
                />

                {/* Account Type */}
                <FormControl fullWidth margin="normal" required>
                  <InputLabel id="accountType-label">Account Type</InputLabel>
                  <Select
                    labelId="accountType-label"
                    name="acType"
                    value={formData.acType}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="Savings">Savings</MenuItem>
                    <MenuItem value="Checking">Checking</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={validateForm}
                >
                  Next
                </Button>
                <Box mt={2} ml={5}>
                  <Typography align="center" style={{ marginTop: "1rem" }}>
                    I've already an account{" "}
                    <Link href="/" underline="hover" ml={1}>
                      LogIn
                    </Link>
                  </Typography>
                </Box>
                <Box mt={2} ml={5}>
                  <Typography align="center" style={{ marginTop: "1rem" }}>
                    If already have an account{" "}
                    <Link href="/signUp" underline="hover" ml={1}>
                      SignUp
                    </Link>
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box className="animate__animated animate__flipInX">
                {/* Date Of Birth */}
                <TextField
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  type="date"
                  required
                />
                {/* Married */}
                <FormControl fullWidth margin="normal" required>
                  <InputLabel id="married-label">Married Status</InputLabel>
                  <Select
                    labelId="married-label"
                    name="married"
                    value={formData.married}
                    onChange={handleChange}
                  >
                    <MenuItem value="Married">Married</MenuItem>
                    <MenuItem value="UnMarried">UnMarried</MenuItem>
                  </Select>
                </FormControl>
                {/* Nominee */}
                <TextField
                  name="nominee"
                  label="nominee"
                  value={formData.nominee}
                  onChange={handleChange}
                  inputProps={{ style: { textTransform: "capitalize" } }}
                  fullWidth
                  margin="normal"
                  type="text"
                  required
                />
                {/* Address */}
                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  inputProps={{ style: { textTransform: "capitalize" } }}
                  multiline
                  rows={3}
                  fullWidth
                  margin="normal"
                  required
                />

                {/* Agree to Terms */}
                <FormControlLabel
                  control={
                    <Checkbox
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      required
                    />
                  }
                  label="I agree to the terms and conditions"
                />
                {/* Submit Button */}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Register
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={formBack}
                >
                  Back
                </Button>
              </Box>
            )}
          </form>
        </Box>
      </animated.div>
    </>
  );
};

export default CreateNewUser;

// firstName: "Thirumalesh",
//     lastName: "Charipalli",
//     email: "ashdkfh@gmail.com",
//     phoneNo: 12321321332,
//     acType: "savings",
//     age: 24,
//     married: "unmarried",
//     nominee: "venkat",
//     address: "kammam",
