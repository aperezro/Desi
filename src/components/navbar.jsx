import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/desi_writing.png';
import smallLogo from '../assets/desi_main.png';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { MdLocationOn } from "react-icons/md";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = nav ? 'hidden' : 'auto';
  }, [nav]);

  const handleNav = () => setNav(!nav);
  const closeNav = () => setNav(false);

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeNav(); // Close the mobile menu after navigation
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Connect with Us', path: '/connect' },
  ];

  return (
    <>
      <div className="bg-amber-50 drop-shadow-md w-full font-mulish fixed top-0 left-0 z-[1000]">
        <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4">
          <div className="flex items-center">
            <div onClick={handleNav} className="cursor-pointer mr-4">
              <AiOutlineMenu size={30} />
            </div>

            <img src={logo} alt="Desi Eats Logo" className="w-52 hover:scale-107 transition-all cursor-pointer" onClick={() => handleNavigation('/')} />

            <ul className="hidden lg:flex items-center gap-12 font-extrabold text-lg ml-8" style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 800 }}>
              {navLinks.map((link, index) => (
                <li key={index} className="relative group cursor-pointer px-3 py-1">
                  <span onClick={() => handleNavigation(link.path)} className="relative cursor-pointer">
                    {link.name}
                    <span className="absolute left-0 -bottom-0.5 h-[3.5px] w-0 bg-orange-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <MdLocationOn size={38} className="text-[#9a2446] cursor-pointer hover:text-[#f16323] hover:scale-115 transition-all" onClick={() => handleNavigation('/locations')} />
          </div>
        </div>
      </div>

      <div className="mt-[80px]"></div>

      {nav && (
        <div onClick={closeNav} className="fixed top-0 left-0 w-full h-screen bg-black/80 z-6000"></div>
      )}

      <div className={`fixed top-0 ${nav ? 'left-0' : '-left-[100%]'} w-[250px] h-screen bg-amber-50 z-7000 p-4 duration-500 ease-in-out`}>
        <AiOutlineClose onClick={closeNav} size={30} className="absolute right-4 top-4 cursor-pointer" />

        <div className="flex flex-col items-start mt-12 mb-6 ml-4">
          <img src={smallLogo} alt="Small Desi Logo" className="w-25 mb-4" onClick={() => handleNavigation('/')} />
          <div className="w-30 h-[2px] bg-orange-600"></div>
        </div>

        <nav className="font-mulish mt-8 ml-4">
          <ul className="space-y-6">
            {navLinks.map((link, index) => (
              <li key={index} className="text-lg flex items-start">
                <span onClick={() => handleNavigation(link.path)} className="text-[#7C2D53] font-extrabold hover:text-orange-600 transition-all cursor-pointer">
                  {link.name}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
