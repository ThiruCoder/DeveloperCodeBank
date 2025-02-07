import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
  EffectFlip,
} from "swiper/modules";
import { useSpring, animated } from "react-spring";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import pic1 from "../../../assets/pic1-Photoroom.png";
import pic2 from "../../../assets/pic2-Photoroom.png";
import pic3 from "../../../assets/pic3-Photoroom.png";
import pic4 from "../../../assets/pic4-Photoroom.png";
import pic5 from "../../../assets/pic5-Photoroom.png";

import { Card, CardMedia, Box } from "@mui/material";

const images = [pic1, pic2, pic3, pic4, pic5];

const SwiperHome = () => {
  const fadeIn = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 150, friction: 15 },
  });

  return (
    <animated.div style={fadeIn}>
      <Box sx={{ maxWidth: 800, margin: "auto", padding: 2 }}>
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Autoplay,
            EffectCoverflow,
            EffectFlip,
          ]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          effect="coverflow"
          coverflowEffect={{
            rotate: 90,
            stretch: 10,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <Box
                className="animate__animated animate__bounceInRight animate__delay-5s"
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  image={img}
                  maxWidth={"100%"}
                  height={"auto"}
                  className="animate__animated animate__bounceInRight animate__delay-5s"
                  sx={{
                    aspectRatio: "3/2",
                    objectFit: "cover",
                    // filter: "drop-shadow(0 0 0.75rem crimson)",
                    bgcolor: "transparent",
                    backgroundRepeat: "no-repeat",
                    mixBlendMode: "multiply",
                  }}
                  alt={`Slide ${index + 1}`}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </animated.div>
  );
};

export default SwiperHome;
