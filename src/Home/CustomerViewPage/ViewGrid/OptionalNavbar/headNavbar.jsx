import { BottomNavigation, BottomNavigationAction, Link } from "@mui/material";
import React from "react";

import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import AddCardIcon from "@mui/icons-material/AddCard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import InfoIcon from "@mui/icons-material/Info";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import PersonIcon from "@mui/icons-material/Person";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";

const useStyles = makeStyles({
  btnStyle: {
    "&:hover": {
      color: "#fa29fa",
    },
  },
});

const HeadNavbar = () => {
  const [value, setValue] = React.useState("");
  const classes = useStyles();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{ width: 500, bgcolor: "transparent" }}
      value={value}
      onChange={handleChange}
    >
      <Tooltip title="User Details" enterDelay={500} leaveDelay={200}>
        <BottomNavigationAction
          className={classes.btnStyle}
          label="user Details"
          value="userDetails"
          onClick={() => navigate("/userDatails")}
          icon={
            <PersonIcon
              sx={{
                "&:hover": { color: "#e00ae0", textShadow: "1px 1px 1px gray" },
              }}
            />
          }
        />
      </Tooltip>
      <Tooltip title="Money Transfer" enterDelay={500} leaveDelay={200}>
        <BottomNavigationAction
          label="Money Transfer"
          value="Money Transfer"
          onClick={() => navigate("/MoneyTransfer")}
          icon={
            <SwapHorizontalCircleIcon
              sx={{
                "&:hover": { color: "#e00ae0", textShadow: "1px 1px 1px gray" },
              }}
            />
          }
        />
      </Tooltip>
      <Tooltip title="Transaction History" enterDelay={500} leaveDelay={200}>
        <BottomNavigationAction
          className={classes.btnStyle}
          label="Transaction History"
          value="transaction History"
          onClick={() => navigate("/TransactionHistory")}
          icon={
            <ReceiptLongIcon
              sx={{
                "&:hover": { color: "#e00ae0", textShadow: "1px 1px 1px gray" },
              }}
            />
          }
        />
      </Tooltip>
      <Tooltip title="User Datails" enterDelay={500} leaveDelay={200}>
        <BottomNavigationAction
          className={classes.btnStyle}
          label="About us"
          value="aboutus"
          icon={
            <InfoIcon
              sx={{
                "&:hover": { color: "#e00ae0", textShadow: "1px 1px 1px gray" },
              }}
            />
          }
        />
      </Tooltip>
    </BottomNavigation>
  );
};

export default HeadNavbar;
