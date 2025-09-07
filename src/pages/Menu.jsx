// src/pages/Menu.jsx
import React, { useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mealsData from "../data/meals.json";

import img1 from "../assets/1.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.png";
import img7 from "../assets/7.png";
import img8 from "../assets/8.png";

const HERO_IMG = img1;
const imageMap = { img3, img4, img5, img6, img7, img8 };

const Menu = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Flatten data for lookups
  const items = useMemo(() => {
    return Object.keys(mealsData).map((key) => {
      const m = mealsData[key] || {};
      const imgSrc = m.image && imageMap[m.image] ? imageMap[m.image] : img1;
      return { id: key, name: m.name || key, raw: m, imgSrc };
    });
  }, []);

  // --- Robust ID finder -------------------------------------------------------
  const findIdSmart = (preferredNames = [], fallbackTokens = []) => {
    const norm = (s) => (s || "").toLowerCase().trim();

    // 1) exact name match (case-insensitive)
    for (const n of preferredNames) {
      const t = norm(n);
      const hit = items.find((i) => norm(i.name) === t);
      if (hit) return hit.id;
    }

    // 2) try matching common key patterns in the id
    if (fallbackTokens.length) {
      const idHit = items.find((i) =>
        fallbackTokens.every((t) => norm(i.id).includes(norm(t)))
      );
      if (idHit) return idHit.id;
    }

    // 3) substring in display name
    if (fallbackTokens.length) {
      const nameHit = items.find((i) =>
        fallbackTokens.every((t) => norm(i.name).includes(norm(t)))
      );
      if (nameHit) return nameHit.id;
    }

    return undefined;
  };

  // Roti Wrap
  const rotiId = findIdSmart(
    ["Roti Wrap", "Roti Wraps"],
    ["roti", "wrap"]
  );
  const rotiImg = (items.find((i) => i.id === rotiId)?.imgSrc) || img1;

  // Basmati Rice Bowl (force img3 per your spec)
  const basmatiId = findIdSmart(
    ["Basmati Rice Bowl", "Basmati Bowl"],
    ["basmati", "bowl"]
  );
  const basmatiImg = img3;

  const go = (id, label) => {
    if (id) {
      navigate(`/details/${id}`);
    } else {
      console.warn(`Menu: could not resolve id for ${label}`);
      // Optional: navigate to a safe default or no-op
      // navigate('/menu'); 
    }
  };

  return (
    <div className="min-h-screen w-full bg-amber-50" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
      {/* HERO */}
      <section className="relative w-full h-[320px] md:h-[420px] lg:h-[480px] overflow-hidden">
        <img src={HERO_IMG} alt="Menu hero" className="absolute inset-0 h-full w-full object-cover scale-110" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-6xl font-extrabold tracking-tight">MENU</h1>
        </div>
      </section>

      {/* CHOOSE YOUR BASE — two large tiles only */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 pt-12 md:pt-16 pb-16">
        <h2
          className="text-center text-[#7C2D53] text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide uppercase mb-6 md:mb-8"
          style={{ letterSpacing: "0.06em" }}
        >
          CHOOSE YOUR BASE
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Left: Roti Wrap */}
          <button
            type="button"
            onClick={() => go(rotiId, "Roti Wrap")}
            className="group w-full text-center focus:outline-none"
            aria-label="Roti Wrap"
          >
            <div className="w-full overflow-hidden">
              <img
                src={rotiImg}
                alt="Roti Wrap"
                className="
                  mx-auto w-full max-w-[720px]
                  h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px]
                  object-contain
                  transition-transform duration-300
                  group-hover:scale-105 group-focus-visible:scale-105
                "
                loading="eager"
              />
            </div>
            <h3 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#3b1026]">ROTI WRAP</h3>
            <p className="mt-1 text-lg font-bold text-[#7C2D53] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              ORDER →
            </p>
          </button>

          {/* Right: Basmati Rice Bowl (image3) */}
          <button
            type="button"
            onClick={() => go(basmatiId, "Basmati Rice Bowl")}
            className="group w-full text-center focus:outline-none"
            aria-label="Basmati Rice Bowl"
          >
            <div className="w-full overflow-hidden">
              <img
                src={basmatiImg}
                alt="Basmati Rice Bowl"
                className="
                  mx-auto w-full max-w-[720px]
                  h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px]
                  object-contain
                  transition-transform duration-300
                  group-hover:scale-105 group-focus-visible:scale-105
                "
                loading="eager"
              />
            </div>
            <h3 className="mt-4 text-2xl md:text-3xl font-extrabold text-[#3b1026]">BASMATI RICE BOWL</h3>
            <p className="mt-1 text-lg font-bold text-[#7C2D53] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              ORDER →
            </p>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Menu;

