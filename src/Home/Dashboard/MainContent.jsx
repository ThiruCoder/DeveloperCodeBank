import React from "react";
import {
  Paper,
  Typography,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useSpring, animated } from "react-spring";

const MainContent = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay: 700,
  });

  return (
    <animated.div style={fadeIn}>
      <Paper elevation={3} className="service-section">
        <Typography variant="h4">Service</Typography>
        <div className="service-section-header">
          <TextField
            placeholder="Account number"
            InputProps={{
              startAdornment: <i className="ph-magnifying-glass"></i>,
            }}
          />
          <Select value="Home">
            <MenuItem value="Home">Home</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
          </Select>
          <Button variant="contained" className="flat-button">
            Search
          </Button>
        </div>
        <Grid container spacing={2} className="tiles">
          <Grid item xs={12} md={4}>
            <Paper className="tile">
              <div className="tile-header">
                <i className="ph-lightning-light"></i>
                <Typography variant="h6">
                  <span>Electricity</span>
                  <span>UrkEnergo LTD.</span>
                </Typography>
              </div>
              <Button endIcon={<i className="ph-caret-right-bold"></i>}>
                Go to service
              </Button>
            </Paper>
          </Grid>
          {/* Add more tiles here */}
        </Grid>
      </Paper>
    </animated.div>
  );
};

export default MainContent;
