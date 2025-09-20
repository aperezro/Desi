import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import boost from "../assets/boost.png";
import logo from "../assets/desi_logo.png";
import college from "../assets/graduation.svg";
import { Link } from "react-router-dom";

// tiny hook to know if we're under Tailwind's "sm" breakpoint
const useIsMobile = () => {
  const query = "(max-width: 639px)";
  const get = () => (typeof window !== "undefined" ? window.matchMedia(query).matches : false);
  const [isMobile, setIsMobile] = useState(get);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const onChange = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isMobile;
};

const MainUnder = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();

  // desktop variants (parent controls children; quick stagger)
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 100 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.15 },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    }),
    []
  );

  return (
    <motion.div
      ref={ref}
      className="w-full flex justify-center py-8 sm:py-10 md:py-12"
      // Desktop: animate whole section; Mobile: let children control themselves
      initial={isMobile ? undefined : "hidden"}
      animate={isMobile ? undefined : isInView ? "visible" : "hidden"}
      variants={isMobile ? undefined : containerVariants}
    >
      <div className="max-w-[1300px] flex flex-col sm:flex-row justify-between space-y-8 sm:space-y-0 sm:space-x-8 md:space-x-16 lg:space-x-36 z-[100] px-4 sm:px-6 md:px-8">

        {/* CARD 1 */}
        <motion.div
          className="flex flex-col items-center text-center flex-1"
          // Mobile: animate when in view (independent); Desktop: use parent-controlled variants
          initial={isMobile ? { opacity: 0, y: 24 } : undefined}
          whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
          viewport={isMobile ? { once: true, amount: 0.4 } : undefined}
          transition={isMobile ? { duration: 0.5, ease: "easeOut" } : undefined}
          variants={isMobile ? undefined : itemVariants}
        >
          <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] bg-gray-500 rounded-full overflow-hidden flex justify-center items-center">
            <img src={boost} alt="Boost" className="w-full h-full object-cover" />
          </div>
          <h2 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold" style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 800 }}>
            Mobile Order
          </h2>
          <p className="text-gray-600 max-w-xs text-sm sm:text-base leading-relaxed">
            Get your order To go! Just like the rest of our campus dining, we accept orders through boost.
          </p>
          <a
  href="https://boostapp.io/"
  onClick={(e) => {
    e.preventDefault();

    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Links
    const appLink = "https://boostapp.app.link"; // universal deep link
    const iosStoreLink = "https://apps.apple.com/us/app/boost-mobile-food-ordering/id1076701365";
    const androidStoreLink = "https://play.google.com/store/apps/details?id=com.ncr.boost";
    const desktopLink = "https://boostapp.io/";

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      // iOS
      const now = Date.now();
      window.location.href = appLink;

      setTimeout(() => {
        if (Date.now() - now < 1500) {
          window.location.href = iosStoreLink;
        }
      }, 1000);
    } else if (/android/i.test(userAgent)) {
      // Android
      const now = Date.now();
      window.location.href = appLink;

      setTimeout(() => {
        if (Date.now() - now < 1500) {
          window.location.href = androidStoreLink;
        }
      }, 1000);
    } else {
      // Desktop fallback
      window.location.href = desktopLink;
    }
  }}
  className="mt-3 px-4 py-2 bg-[#f16323] text-white hover:bg-yellow-500 rounded-full transition-all font-bold border border-black hover:scale-105 shadow-lg text-sm sm:text-base"
>
  View details &raquo;
</a>

        </motion.div>

        {/* CARD 2 */}
        <motion.div
          className="flex flex-col items-center text-center flex-1"
          initial={isMobile ? { opacity: 0, y: 24 } : undefined}
          whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
          viewport={isMobile ? { once: true, amount: 0.4 } : undefined}
          transition={isMobile ? { duration: 0.5, ease: "easeOut" } : undefined}
          variants={isMobile ? undefined : itemVariants}
        >
          <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] bg-gray-500 rounded-full overflow-hidden flex justify-center items-center">
            <img src={logo} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h2 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold" style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 800 }}>
            Stay up to date!
          </h2>
          <p className="text-gray-600 max-w-xs text-sm sm:text-base leading-relaxed">
            Keep up with our events on campus or news about our brand on our social media pages. Follow us!
          </p>
          <a
            href="https://www.instagram.com/desieatsus/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 px-4 py-2 bg-[#f16323] text-white transition-all shadow-lg hover:bg-yellow-500 rounded-full font-bold border border-black hover:scale-105 text-sm sm:text-base"
          >
            View details &raquo;
          </a>
        </motion.div>

        {/* CARD 3 */}
        <motion.div
          className="flex flex-col items-center text-center flex-1"
          initial={isMobile ? { opacity: 0, y: 24 } : undefined}
          whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
          viewport={isMobile ? { once: true, amount: 0.4 } : undefined}
          transition={isMobile ? { duration: 0.5, ease: "easeOut" } : undefined}
          variants={isMobile ? undefined : itemVariants}
        >
          <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] bg-[#9a2546] rounded-full flex justify-center items-center">
            <img src={college} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h2 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold" style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 800 }}>
            Want us at your Campus?
          </h2>
          <p className="text-gray-600 max-w-xs text-sm sm:text-base leading-relaxed">
            We are looking to continue bringing our excellent dining service to more schools. Add some Desi to your campus!
          </p>
          <Link
            to="/connect"
            className="mt-3 px-4 py-2 bg-[#f16323] text-white hover:bg-yellow-500 rounded-full font-bold border border-black hover:scale-105 transition-all shadow-lg text-sm sm:text-base"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            View details &raquo;
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MainUnder;
