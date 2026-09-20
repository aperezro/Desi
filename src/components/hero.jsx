import React from "react";
import bannerLetters from "../assets/banner_letters.svg";
import bannerBackground from "../assets/optimized/banner9-2400.webp";
import bannerBackgroundRetina from "../assets/optimized/banner9-4800.webp";
import desiLogo from "../assets/optimized/desi_logo-440.webp";

const Hero = () => {
  return (
    <div className="w-full overflow-hidden z-[50] relative">
      {/* Give the container an explicit height on mobile; sm+ can be taller */}
      <div className="relative h-[300px] sm:h-[450px] md:h-[500px]">
        
        {/* Dark overlay only when bg is visible (sm+) */}
        <div className="hidden sm:block absolute inset-0 bg-black/2 z-[51]" />

        {/* Centered logo/banner */}
        <div className="absolute inset-0 flex justify-center items-center z-[52] translate-x-0 sm:translate-x-3 md:translate-x-5">
          <picture>
            <source media="(min-width: 640px)" srcSet={bannerLetters} width="450" height="130" />
            <img
              src={desiLogo}
              alt="Desi Eats Logo"
              width="440"
              height="440"
              fetchPriority="high"
              className="w-[220px] sm:w-[400px] md:w-[550px] lg:w-[600px] h-auto object-contain drop-shadow-[0_0_15px_rgba(249,115,22,0.9)] sm:drop-shadow-none"
            />
          </picture>
        </div>

        {/* Background image only on sm+; make it fill the container */}
        <picture className="hidden sm:block">
          {/* A 4:1 image covering a 500px-tall hero needs at least 2000 CSS pixels. */}
          <source
            media="(min-width: 640px)"
            srcSet={`${bannerBackground} 2400w, ${bannerBackgroundRetina} 4800w`}
            sizes="(min-width: 2000px) 100vw, (min-width: 768px) 2000px, 1800px"
          />
          <img
            src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
            alt=""
            width="2400"
            height="600"
            className="absolute inset-0 w-full h-full object-cover z-[50]"
            fetchPriority="high"
            loading="eager"
          />
        </picture>
      </div>
    </div>
  );
};

export default Hero;
