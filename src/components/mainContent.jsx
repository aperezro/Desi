import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import foodCourt from "../assets/foodcourt.svg";



const MainContent = () => {
  const navigate = useNavigate();

  const handleScrollToTop = () => {
    navigate("/connect");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full bg-amber-50 font-hanken">
      

      {/* Main Content Section */}
      <div className="max-w-[1640px] mx-auto flex flex-col lg:flex-row items-center px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12 lg:px-16 lg:py-16">
           {/* Blurs Container */}
      <div className="absolute inset-0 z-1 pointer-events-none hidden lg:block">
        <div className="absolute top-[80%] left-[0%] h-[550px] w-[220px] bg-[#f6c917] opacity-80 blur-[120px] rounded-full -translate-y-20 -translate-x-28" ></div>
        <div className="absolute top-[120%] left-[77%] h-[150px] w-[350px] bg-[#f66517] opacity-80 blur-[120px] rounded-full -translate-y-20" ></div>
      </div>
      {/* Mobile blobs */}
<div className="absolute inset-0 z-2 pointer-events-none lg:hidden">
  <div className="absolute top-10 left-1/2 h-[150px] w-[150px] bg-[#fe8046] opacity-40 blur-[60px] rounded-full -translate-x-1/2" />
  <div className="absolute bottom-0 right-1/4 h-[120px] w-[120px] bg-[rgb(247,197,61)] opacity-50 blur-[50px] rounded-full" />
</div>
        {/* Left side: Text */}
        <motion.div 
          className="flex-1 flex flex-col justify-center items-start text-left space-y-4 sm:space-y-6 z-2 w-full lg:w-auto"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="weight-4 font-hanken !text-[32px] sm:!text-[40px] md:!text-[48px] lg:!text-[54px] !text-[#9a2446] font-bold leading-tight"style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 800 }}>
            ABOUT <span className="text-orange-500 weight-500 font-bold"style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 800 }}>DESI EATS</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-md font-bold leading-relaxed">
            At Desi Eats, we are passionate about bringing the rich, vibrant flavors of authentic Indian cuisine right to your table. Every dish we craft is a celebration of tradition, spices, and love.
          </p>
          <p className="text-base sm:text-lg text-gray-700 max-w-md font-bold leading-relaxed">
            We currently operate in Babson College and will be operating starting next Fall!
          </p>
          <motion.div 
            className="flex items-center space-x-4 w-full sm:w-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <button
              onClick={handleScrollToTop}
              className="bg-[#f16323] cursor-pointer hover:bg-yellow-500 border border-black rounded-full px-6 py-2.5 sm:px-8 sm:py-3 font-bold transition-all hover:scale-105 text-white shadow-lg text-sm sm:text-base w-full sm:w-auto"
            >
              Learn More
            </button> 
            
            
          </motion.div>
        </motion.div>

        {/* Right side: Image */}
        <motion.div 
          className="flex-1 mt-6 sm:mt-8 lg:mt-0 relative flex justify-center lg:justify-end items-center z-40 w-full"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={foodCourt}
            alt="About Desi Eats"
            className="w-full max-w-md sm:max-w-lg lg:max-w-none h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-md shadow-2xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default MainContent;
