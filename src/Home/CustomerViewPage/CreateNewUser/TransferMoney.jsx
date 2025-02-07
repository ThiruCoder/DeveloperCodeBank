import {
  Box,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { get, getDatabase, ref, set, update } from "firebase/database";
import React, { useState } from "react";
import { app, database } from "../../../Main-Redux/FireBase/fireBaseConfig";
import { toast } from "react-toastify";

const useStyles = makeStyles(() => ({
  textField: {
    marginBottom: "1rem",
  },
}));
const initailData = {
  phone: "",
  Ac_number1: "",
  Ac_number2: "",
  amount: "",
  acceptance: false,
};

const TransferMoney = () => {
  const [transData, setTransData] = useState(initailData);
  const [gatherData, setGatherData] = useState([]);
  const classes = useStyles();

  async function transSubmit(e) {
    e.preventDefault();
    const db = database;
    const refer = ref(db, "customAc/customerAc");
    try {
      const geterMaper = get(refer);
      if ((await geterMaper).exists()) {
        const getMaper = Object.entries((await geterMaper).val());
        const mob = Number(transData.phone);
        const num = Number(transData.Ac_number2);

        const tofinder = getMaper.find(
          ([key, item]) =>
            item.Ac_number == transData.Ac_number1 && item.phone == mob
        );

        const fromfinder = getMaper.find(
          ([key, item]) => item.Ac_number == num
        );

        if (!tofinder && !fromfinder) {
          toast.error("Submitted credentials are not matched! </br> Try again");
        } else {
          const [key1, record1] = tofinder;
          if (record1.balance >= transData.amount) {
            if (record1.balance > 0) {
              const [key2, record2] = fromfinder;

              const transAmount = Number(transData.amount);

              const recordRef1 = ref(db, `customAc/customerAc/${key1}`);
              const recordRef2 = ref(db, `customAc/customerAc/${key2}`);

              const finalObj2 = [Number(record2.balance), transAmount];

              const finalMinus = Number(record2.balance) - transAmount;
              const finalPlus = finalObj2.reduce((arr, curr) => arr + curr, 0);

              if (finalMinus) {
                await update(recordRef1, {
                  balance: finalMinus.toFixed(2),
                });
              }
              if (finalPlus) {
                await update(recordRef2, {
                  balance: finalPlus.toFixed(2),
                });
                toast.success("Transaction successfully completed.");
              } else {
                toast.error("Above credentials are not valid...");
              }
            }
          } else {
            toast.error(
              `Your account is not have sufficient amount : ${transData.amount}`
            );
          }
        }
      }
    } catch (error) {
      console.error("❌ Error fetching/updating data:", error);
      toast.error("Transaction failed.");
    }

    console.log(getMaper);

    console.log("submited :", transData);
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
      <form onSubmit={transSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            className={classes.textField}
            value={transData.phone}
            onChange={handleChange}
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Your Phone number"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            className={classes.textField}
            value={transData.Ac_number1}
            onChange={handleChange}
            required
            margin="dense"
            id="Ac_number1"
            name="Ac_number1"
            label="From Account number"
            type="number"
            fullWidth
            variant="standard"
          />
          <Typography variant="v5">To</Typography>
          <TextField
            autoFocus
            className={classes.textField}
            value={transData.Ac_number2}
            onChange={handleChange}
            required
            margin="dense"
            id="Ac_number2"
            name="Ac_number2"
            label="To Account number"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            className={classes.textField}
            value={transData.amount}
            onChange={handleChange}
            placeholder="0"
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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default TransferMoney;
