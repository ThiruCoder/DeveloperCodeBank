import React from "react";
import { Typography } from "@mui/material";
import { useSpring, animated } from "react-spring";

const Footer = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay: 900,
  });

  return (
    <animated.div style={fadeIn}>
      <footer className="footer">
        <Typography variant="h6">
          Almeria<small>©</small>
        </Typography>
        <Typography variant="body2">
          Almeria ©<br />
          All Rights Reserved 2021
        </Typography>
      </footer>
    </animated.div>
  );
};

export default Footer;
