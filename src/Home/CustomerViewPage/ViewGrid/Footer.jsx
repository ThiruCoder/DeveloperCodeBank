import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import {
  Facebook,
  Twitter,
  LinkedIn,
  GitHub,
  Instagram,
  Phone,
  WhatsApp,
  Mail,
  YouTube,
} from "@mui/icons-material";
import { useSpring, animated } from "react-spring";
import { makeStyles } from "@mui/styles";
import { useTrail, a } from "@react-spring/web";

const useStyles = makeStyles({
  iconHov: {
    "&:hover": {
      scale: "1.5",

      transition: " all 0.4s ease-in-out ",
      color: "#f8e5eb",
    },
  },
});

const Trail = ({ open, children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 40 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} style={style}>
          <a.div style={{ height, cursor: "pointer" }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  );
};

const FooterHome = () => {
  // React-Spring Hover Effect
  const [open, set] = useState(true);
  const hoverEffect = useSpring({
    to: { transform: "translateY(0px)" },
    from: { transform: "translateY(10px)" },
    config: { tension: 200, friction: 10 },
  });
  const classes = useStyles();

  return (
    <animated.div
      style={hoverEffect}
      className="animate__animated animate__fadeInUp"
    >
      <Box
        sx={{
          backgroundColor: "#2c3e50",
          color: "white",
          textAlign: "center",
          padding: "20px",
          mt: 5,
          mb: 0,
        }}
      >
        <div onClick={() => set((state) => !state)}>
          <Trail open={open}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              © {new Date().getFullYear()} DevelopeCode Bank. All rights
              reserved.
            </Typography>
          </Trail>
        </div>
        {/* Social Media Icons */}
        <Box sx={{ mt: 2 }}>
          <IconButton
            className={`animate__animated animate__zoomIn ${classes.iconHov}`}
            sx={{ color: "white", mx: 1 }}
            href="https://www.facebook.com/profile.php?id=100090141135856"
          >
            <Facebook />
          </IconButton>
          <IconButton
            className={`animate__animated animate__zoomIn ${classes.iconHov}`}
            sx={{ color: "white", mx: 1 }}
            href="https://www.instagram.com/thiru_king1/?utm_source=qr&igsh=ZzB1MGc0ZmE0Nm5u"
          >
            <Instagram />
          </IconButton>

          <IconButton
            className={`animate__animated animate__zoomIn ${classes.iconHov}`}
            sx={{ color: "white", mx: 1 }}
            href="https://github.com/ThiruCoder?tab=repositories"
          >
            <GitHub />
          </IconButton>
          <IconButton
            className={`animate__animated animate__zoomIn ${classes.iconHov}`}
            sx={{ color: "white", mx: 1 }}
            href="tel:7569583293"
          >
            <Phone />
          </IconButton>
          <IconButton
            className={`animate__animated animate__zoomIn ${classes.iconHov}`}
            sx={{ color: "white", mx: 1 }}
            href="https://wa.me/7569583293"
          >
            <WhatsApp />
          </IconButton>
          <IconButton
            className={`animate__animated animate__zoomIn ${classes.iconHov}`}
            sx={{ color: "white", mx: 1 }}
            href="mailto:thiruthedeveloper@gmail.com"
          >
            <Mail />
          </IconButton>
          <IconButton
            className={`animate__animated animate__zoomIn ${classes.iconHov}`}
            sx={{ color: "white", mx: 1 }}
            href="https://www.youtube.com/@DeveloperCode-i5"
          >
            <YouTube />
          </IconButton>
        </Box>
      </Box>
    </animated.div>
  );
};

export default FooterHome;
