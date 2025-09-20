import React from "react";
import bannerLetters from "../assets/banner_letters.svg";
import bannerBackground from "../assets/banner9.svg";
import desiLogo from "../assets/desi_logo.png";

const Hero = () => {
  return (
    <div className="w-full overflow-hidden z-[50] relative">
      {/* Give the container an explicit height on mobile; sm+ can be taller */}
      <div className="relative h-[300px] sm:h-[450px] md:h-[500px]">
        
        {/* Dark overlay only when bg is visible (sm+) */}
        <div className="hidden sm:block absolute inset-0 bg-black/40 z-[51]" />

        {/* Centered logo/banner */}
        <div className="absolute inset-0 flex justify-center items-center z-[52] translate-x-0 sm:translate-x-3 md:translate-x-5">
         {/* Mobile: show logo with orange glow */}
<img
  src={desiLogo}
  alt="Desi Eats Logo"
  className="block sm:hidden w-[220px] object-contain drop-shadow-[0_0_15px_rgba(249,115,22,0.9)]"
/>

          {/* sm+: show banner letters */}
          <img
            src={bannerLetters}
            alt="Banner Writing"
            className="hidden sm:block w-[400px] md:w-[550px] lg:w-[600px] object-contain"
          />
        </div>

        {/* Background image only on sm+; make it fill the container */}
        <img
          src={bannerBackground}
          alt="Food"
          className="hidden sm:block absolute inset-0 w-full h-full object-cover z-[50]"
        />
      </div>
    </div>
  );
};

export default Hero;

