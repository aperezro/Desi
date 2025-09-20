import React from "react";
import { AiOutlinePhone, AiOutlineMail, AiOutlineHome } from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx"; // "X" logo for Twitter/X
import { FaApple, FaGooglePlay } from "react-icons/fa";
import desiLogoVertical from "../assets/desi_writing.png";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <div className="w-full bg-amber-100 text-black font-mulish pt-10  z-[100]"style={{ fontFamily: "'Hanken Grotesk', sans-serif  z-[100]", fontWeight: 800 }}>
      <div className="max-w-[1640px] mx-auto flex flex-col lg:flex-row justify-between px-6 pb-10  z-[100]">

        {/* LEFT - Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm font-semibold  z-[100]">

          {/* Our Company */}
          <div className="space-y-4">
            <h3 className="uppercase font-bold">Our Company</h3>
            <Link to="/connect" className="hover:text-orange-600 transition-all block"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}  >Connect with Us
            </Link>
          </div>

          {/* Our Food */}
          <div className="space-y-4">
            <h3 className="uppercase font-bold">Our Food</h3>
            
            
    
            <Link to="/locations" className="hover:text-orange-600 transition-all block"
              >Locations
            </Link>

              <p><a 
        href="https://boostapp.io/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-black hover:text-orange-600 "
      >Boost Order
      </a>
    </p>

          </div>

          {/* Social */}
          <div className="space-y-6">
            <div>
              <h3 className="uppercase mb-2 font-bold">Social</h3>
              <div className="flex items-center gap-4">
                <a 
                  href="https://www.instagram.com/desieatsus/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-orange-600 transition-all"
                >
                  <FaInstagram size={24} />
                </a>
                <a 
        href="https://www.linkedin.com/in/krish-khemlani-204105217/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:text-blue-600 transition-all"
      >
        <FaLinkedin size={24} />
      </a>



              </div>
            </div>
          </div>

        </div>

        {/* RIGHT - Krish Contact + Vertical Logo */}
        <div className="flex flex-row items-start justify-end mt-10 lg:mt-0">

          {/* Contact Info */}
          <div className="flex flex-col items-end text-right space-y-4 text-sm">
            <h1 className="text-2xl font-extrabold text-[#7C2D53]">Contact Us:</h1>



            <div className="flex items-center gap-1 text-orange-600 weight-bold">
              <AiOutlineMail size={20} />
               <a href="mailto:desieatsus@outlook.com" className=" weight-bold hover:underline">
    desieatsus@outlook.com
  </a>
            </div>

            
          </div>

          {/* Vertical Logo */}
          <div className="flex flex-col items-center justify-start pt-19">
            <img src={desiLogoVertical} alt="Desi Eats Vertical Logo" className="w-45 rotate-90" />
          </div>

        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="text-center py-6 text-sm font-semibold">
        © 2025 DESI EATS All Rights Reserved.
      </div>

    </div>
  );
};

export default Footer;
