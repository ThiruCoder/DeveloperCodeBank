import {
  Box,
  Button,
  Checkbox,
  DialogContent,
  FormControlLabel,
  Paper,
  TextField,
} from "@mui/material";
import { get, getDatabase, ref, set, update } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import { database } from "../../../Main-Redux/FireBase/fireBaseConfig";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../ViewGrid/Context/Context";
import Navbar from "../ViewGrid/Navbar";

const useStyles = makeStyles(() => ({
  textField: {
    marginBottom: "1rem",
  },
}));

const initailData = {
  Ac_number: "",

  amount: "",
  acceptance: false,
};

const Deposit = () => {
  const classes = useStyles();
  const [transData, setTransData] = useState(initailData);

  const navigate = useNavigate();

  const { userLoggedIn, localHistory, setLocalHistory } =
    useContext(GlobalContext);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    if (userLoggedIn) {
      const getlocalStorage = localStorage.getItem("user_data");
      const localStorageUser = JSON.parse(getlocalStorage);
      const localStorageAfterParse = Array.isArray(localStorageUser)
        ? localStorageUser
        : [localStorageUser];
      const allowDiposit = localStorageAfterParse.findIndex(
        (ite) => ite.role === "admin"
      );

      setIsAdmin(allowDiposit);
    }
  }, [userLoggedIn]);
  const passToParse = localStorage.getItem("localTrxHistory");
  const getLocalStorage = JSON.parse(passToParse);
  async function handleSubmit(e) {
    e.preventDefault();

    const db = database;

    try {
      const refer = ref(db, "customAc/customerAc");
      const snapShot = await get(refer); // Await the Firebase get() function

      if (snapShot.exists()) {
        // Use exists() instead of exists

        const data = snapShot.val();
        const keyVal = Object.entries(data);
        console.log(keyVal);

        const foundEntry = keyVal.find(
          ([key, item]) => item.Ac_number == transData.Ac_number
        );
        const numAmount = Number(transData.amount);
        const thous = 1000;
        const limitCount = 5;
        const d = new Date();
        const dy = d.getFullYear();
        const dm = d.getMonth();
        const dd = d.getDay();

        const ddZeros = dd < 10 ? `0${dd}` : dd;
        const dmZeros = dm < 10 ? `0${dm}` : dm;
        const fullDate = `${dy}-${dmZeros}-${ddZeros}`;

        const filterForDate = getLocalStorage.findIndex(
          (ite) => ite.date !== fullDate
        );

        if (foundEntry) {
          const [key, record] = foundEntry;
          const recordRef = ref(db, `customAc/customerAc/${key}`);

          const newBalance = [Number(record.balance) + numAmount];
          const totalBalance = newBalance.reduce((arr, cur) => arr + cur, 0);
          if (isAdmin === -1 ? numAmount <= thous : numAmount) {
            await update(recordRef, {
              balance: Number(totalBalance.toFixed(2)),
            });

            toast.success("Amount successfully Deposited...");
            navigate("/home");
          } else {
            toast.error(`Deposit amount must be under ${thous}`);
          }
        } else {
          console.log("❌ No data found in customAc/customerAc.");
          toast.error("Account not found!");
        }
      }
    } catch (error) {
      console.error("❌ Error fetching/updating data:", error);
      toast.error("Transaction failed.");
    }
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setTransData({
      ...transData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  return (
    <>
      <Navbar />
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          width: "100wh",
        }}
      >
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              className={classes.textField}
              value={transData.Ac_number}
              onChange={handleChange}
              required
              margin="dense"
              id="Ac_number"
              name="Ac_number"
              label="From Account number"
              type="number"
              fullWidth
              variant="standard"
            />

            <TextField
              autoFocus
              className={classes.textField}
              value={transData.amount}
              onChange={handleChange}
              placeholder="0.00"
              required
              margin="dense"
              id="amount"
              name="amount"
              label="To Account number"
              type="number"
              fullWidth
              variant="standard"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="acceptance"
                  checked={transData.acceptance || false}
                  onChange={handleChange}
                  required
                />
              }
              label="I agree to the terms and conditions"
            />
          </DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="contained"
              type="button"
              onClick={() => navigate("/")}
            >
              Back
            </Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </>
  );
};
export default Deposit;
