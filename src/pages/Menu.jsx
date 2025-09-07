// src/pages/Menu.jsx
import React, { useMemo } from "react";
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

  const items = useMemo(() => {
    return Object.keys(mealsData).map((key) => {
      const m = mealsData[key] || {};
      const imgSrc = m.image && imageMap[m.image] ? imageMap[m.image] : img1;
      return {
        id: key,
        name: m.name || key,
        imgSrc,
      };
    });
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-amber-50"
      style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
    >
      {/* HERO */}
      <section className="relative w-full h-[320px] md:h-[420px] lg:h-[480px] overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Menu hero"
          className="absolute inset-0 h-full w-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-6xl font-extrabold tracking-tight">
            MENU
          </h1>
        </div>
      </section>

      {/* GRID / LIST */}
      <main className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-12 md:py-16">
        {/* NOTE:
            - Mobile: single column, but each item is a horizontal row (image left, text right)
            - Desktop: 3-column grid with your existing centered style
        */}
        <ul className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-1 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => navigate(`/details/${item.id}`)}
                className="group block w-full focus:outline-none"
              >
                {/* Wrapper:
                    - Mobile: row layout
                    - Desktop: revert to block/centered
                */}
                <div className="flex items-center gap-5 sm:gap-6 lg:block">
                  {/* Image:
                      - Mobile: smaller thumb on the left
                      - Desktop: your big centered image with hover scale
                  */}
                  <img
                    src={item.imgSrc}
                    alt={item.name}
                    className="
                      flex-shrink-0
                      h-20 w-auto sm:h-24
                      object-contain
                      transition-transform duration-300
                      group-hover:scale-105 group-focus-visible:scale-105
                      lg:mx-auto
                      lg:h-[360px] lg:w-full lg:max-w-[540px]
                    "
                    loading="lazy"
                  />

                  {/* Text area:
                      - Mobile: left-aligned next to the image
                      - Desktop: centered under the image
                  */}
                  <div className="lg:mt-4 w-full">
                    <h3
                      className="
                        text-left text-xl sm:text-2xl font-extrabold tracking-tight text-[#3b1026]
                        lg:text-center
                      "
                    >
                      {item.name}
                    </h3>

                    {/* ORDER hint (appears on hover/focus) */}
                    <p
                      className="
                        mt-1 sm:mt-2 text-base sm:text-lg font-bold text-[#7C2D53]
                        opacity-0 transition-opacity duration-300
                        group-hover:opacity-100 group-focus-visible:opacity-100
                        text-left lg:text-center
                      "
                    >
                      ORDER →
                    </p>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Menu;
