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
// --- simple placeholders; replace with your real totals later ---------------
const totals = { calories: 0, fat: 0, protein: 0, carbs: 0 };
const pad2 = (n) => String(Math.max(0, Math.floor(n))).padStart(2, "0");
// ---------------------------------------------------------------------------


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

      {/* HERO (Nutrition-style) */}
{/* HERO (mobile = centered card; desktop = two-column with totals) */}

<section className="w-full bg-[rgb(253,243,210)] border-t border-b">
  
  <div className="mx-auto max-w-7xl">
    
    {/* MOBILE VIEW (matches screenshot) */}
    <div className="md:hidden relative overflow-hidden px-6 py-10 text-center">
      
      {/* soft garnish blobs; replace with actual corner images if you have them */}
      <div className="pointer-events-none absolute inset-0">
        <div className=" absolute inset-0 bg-black/5 z-[51]" />
        <div className="absolute -left-10 -bottom-12 w-40 h-40 rounded-full bg-orange-200/50 blur-xl" />
        <div className="absolute -right-11 -top-12 w-20 h-40 rounded-full bg-[#f2b4d2] blur-2xl" />
      </div>

      <p className="uppercase tracking-[0.35em] text-[#7C2D53] text-sm font-extrabold">
        CALCULATE
      </p>
      <h1 className="mt-1 text-[#fe8046] text-5xl font-extrabold tracking-[0.06em]">
        NUTRITION
      </h1>
      <p className="mt-4 mx-auto max-w-[28ch] text-[#7C2D53]/80 text-sm font-semibold">
        Build your calorie, carb and nutrition information based on
        your selected meal below using the nutrition calculator.
      </p>
      
    </div>

    {/* TABLET/DESKTOP VIEW (your previous layout) */}
    <div className="hidden md:flex items-center gap-12 px-8 py-12">
      
      {/* Left: Title & copy */}
      <div className="flex-1">
        
        <p className="uppercase tracking-widest text-[#7C2D53] text-lg font-bold">
          Calculate
        </p>
        <h1 className="mt-1 text-[#fe8046] text-6xl font-extrabold tracking-[0.08em]">
          NUTRITION
        </h1>
        <p className="mt-4 max-w-md text-[#7C2D53]/80 font-bold">
          Build your calorie, carb and nutrition information based on
          your selected meal below using the nutrition calculator.
        </p>
    
      </div>

      {/* Divider */}
      <div className="w-px self-stretch bg-[#d4d4d4]" />

      {/* Right: Big totals */}
      <div className="flex-1 flex items-center gap-12">
        {/* Calories */}
        <div className="flex items-baseline">
          <span className="text-[#4b2a1d] text-7xl font-extrabold leading-none">
            {pad2(totals.calories)}
          </span>
          <span className="ml-2 text-[#4b2a1d] text-3xl font-extrabold">cal</span>
        </div>

        {/* Macros */}
        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className="text-[#4b2a1d] text-2xl font-extrabold leading-none">
              {pad2(totals.fat)}g
            </div>
            <div className="text-[#4b2a1d]/80 text-sm mt-1">Fat</div>
          </div>
          <div className="text-center">
            <div className="text-[#4b2a1d] text-2xl font-extrabold leading-none">
              {pad2(totals.protein)}g
            </div>
            <div className="text-[#4b2a1d]/80 text-sm mt-1">Protein</div>
          </div>
          <div className="text-center">
            <div className="text-[#4b2a1d] text-2xl font-extrabold leading-none">
              {pad2(totals.carbs)}g
            </div>
            <div className="text-[#4b2a1d]/80 text-sm mt-1">Carbs</div>
          </div>
        </div>
      </div>
    </div>
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

