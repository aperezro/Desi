import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mealsData from '../data/meals.json';

import img1 from '../assets/1.png'; // fallback
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import img5 from '../assets/5.png';
import img6 from '../assets/6.png';
import img7 from '../assets/7.png';
import img8 from '../assets/8.png';

const imageMap = { img3, img4, img5, img6, img7, img8 };

const Details = () => {
  const { mealName } = useParams();
  const navigate = useNavigate();
  const meal = mealsData[mealName];

  // Ensure page scrolls to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // default hero image (meal image or fallback)
  const defaultHero =
    meal?.image && imageMap[meal.image] ? imageMap[meal.image] : img1;

  // HERO image that can change when a protein is selected (Basmati only)
  const [heroImage, setHeroImage] = useState(defaultHero);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [optionQuantities, setOptionQuantities] = useState({});

  const mealNameLc = (meal?.name || '').toLowerCase();
  const isBasmatiBowl = mealNameLc === 'basmati rice bowl';
  const isRotiWrap = mealNameLc === 'roti wrap';
  const isStructuredMeal = isBasmatiBowl || isRotiWrap;

  // Map protein names -> hero images (used ONLY for Basmati)
  const proteinHeroByName = useMemo(
    () => ({
      'Keema (Ground Pork)': img7,
      'Butter Chicken Marinade': img5,
      'Chole (Chickpeas)': img8,
      'Paneer (Indian Cheese)': img3,
    }),
    []
  );

  // PROTEINS: for both Basmati & Roti use the meal's options as proteins.
  // Attach img only for Basmati (for hero swapping).
  const proteinOptions = useMemo(() => {
    if (!isStructuredMeal) return [];
    return (meal?.options || []).map((o) => ({
      ...o,
      img: isBasmatiBowl ? proteinHeroByName[o.name] : undefined,
      __section: 'PROTEIN',
    }));
  }, [isStructuredMeal, isBasmatiBowl, meal?.options, proteinHeroByName]);

  // SAUCE: same two you specified
  const sauceOptions = useMemo(() => {
    if (!isStructuredMeal) return [];
    return [
      {
        name: 'Makhani Sauce (Famously Paired with Butter Chicken Marinade)',
        cal: 170, fat: 17, protein: 3, carbs: 8, __section: 'SAUCE',
      },
      
      { name: 'Palak Sauce (Spinach)', cal: 140, fat: 9, protein: 4, carbs: 13, __section: 'SAUCE' },
    ];
  }, [isStructuredMeal]);

  // TOPPINGS: same list you provided
  const toppingOptions = useMemo(() => {
    if (!isStructuredMeal) return [];
    return [
      { name: 'Roasted Corn', cal: 5,  fat: 0, protein: 0, carbs: 1, __section: 'TOPPINGS' },
      { name: 'Pickeled Onions', cal: 10, fat: 0, protein: 0, carbs: 2, __section: 'TOPPINGS' },
      { name: 'Romaine Lettuce', cal: 8,  fat: 0, protein: 0, carbs: 2, __section: 'TOPPINGS' },
      { name: 'Cucumber Slaw', cal: 12,  fat: 0, protein: 0, carbs: 3, __section: 'TOPPINGS' },
      { name: 'Lime',           cal: 2,  fat: 0, protein: 0, carbs: 0, __section: 'TOPPINGS' },
    ];
  }, [isStructuredMeal]);

  // Nutrition total (base + selected)
  const total = selectedOptions.reduce(
    (acc, item) => {
      const multiplier = optionQuantities[item.name] === 'Double' ? 2 : 1;
      return {
        cal: acc.cal + item.cal * multiplier,
        fat: acc.fat + item.fat * multiplier,
        protein: acc.protein + item.protein * multiplier,
        carbs: acc.carbs + item.carbs * multiplier,
      };
    },
    { ...meal.base }
  );

  // Toggle handler with protein single-select
  // - Basmati: swaps hero image to the selected protein's image
  // - Roti:    DOES NOT change hero (stays default)
  const toggleOption = (option) => {
    const isProtein = option.__section === 'PROTEIN';
    const exists = selectedOptions.some((o) => o.name === option.name);

    if (isProtein) {
      if (exists) {
        // Deselect current protein
        const next = selectedOptions.filter((o) => o.name !== option.name);
        setSelectedOptions(next);
        setOptionQuantities((prev) => {
          const copy = { ...prev };
          delete copy[option.name];
          return copy;
        });
        // Revert hero ONLY for Basmati
        if (isBasmatiBowl) setHeroImage(defaultHero);
      } else {
        // Single-select: remove any previously selected protein
        const withoutProtein = selectedOptions.filter((o) => o.__section !== 'PROTEIN');
        setSelectedOptions([...withoutProtein, option]);

        setOptionQuantities((prev) => {
          // clean previous protein qty
          const cleaned = Object.fromEntries(
            Object.entries(prev).filter(([name]) => {
              const opt = selectedOptions.find((o) => o.name === name);
              return !opt || opt.__section !== 'PROTEIN';
            })
          );
          cleaned[option.name] = 'Normal';
          return cleaned;
        });

        // Swap hero ONLY for Basmati
        if (isBasmatiBowl) setHeroImage(option.img || defaultHero);
      }
      return;
    }

    // Non-protein: multi-select
    if (exists) {
      setSelectedOptions(selectedOptions.filter((o) => o.name !== option.name));
      setOptionQuantities((prev) => {
        const copy = { ...prev };
        delete copy[option.name];
        return copy;
      });
    } else {
      setSelectedOptions([...selectedOptions, option]);
      setOptionQuantities((prev) => ({ ...prev, [option.name]: 'Normal' }));
    }
  };

  const setQuantity = (optionName, quantity) => {
    setOptionQuantities((prev) => ({ ...prev, [optionName]: quantity }));
  };

  // Generic grid section (radios for protein; checkboxes otherwise)
  const renderSection = (title, options) => {
    if (!options.length) return null;

    const isProteinSection = options[0]?.__section === 'PROTEIN';

    return (
      <div className="mb-10">
        <h2
          className="text-xl font-bold text-[#7C2D53] mb-3 uppercase"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 800 }}
        >
          {title}
        </h2>

        {/* Header row */}
        <div className="grid grid-cols-6 font-semibold text-sm text-gray-600 border-b border-gray-300 mb-2">
          <div className="col-span-2">Ingredient</div>
          <div className="text-right">Calories</div>
          <div className="text-right">Fat</div>
          <div className="text-right">Protein</div>
          <div className="text-right">Carbs</div>
        </div>

        <ul className="space-y-2">
          {options.map((option) => {
            const isChecked = selectedOptions.some((o) => o.name === option.name);
            return (
              <li
                key={`${title}-${option.name}`}
                className="grid grid-cols-6 items-center py-3 border-b hover:bg-amber-50 cursor-pointer"
                onClick={() => toggleOption(option)}
              >
                <div className="col-span-2 flex items-center gap-4">
                  {/* thumbnails intentionally removed */}
                  {isProteinSection ? (
                    <input
                      type="radio"
                      name="protein"
                      checked={isChecked}
                      readOnly
                      className="w-5 h-5 accent-[#7C2D53]"
                    />
                  ) : (
                    <input
                      type="checkbox"
                      checked={isChecked}
                      readOnly
                      className="w-5 h-5 accent-[#7C2D53]"
                    />
                  )}
                  <span className="font-semibold">{option.name}</span>
                </div>

                <div className="text-right">{option.cal} cal</div>
                <div className="text-right">{option.fat}g</div>
                <div className="text-right">{option.protein}g</div>
                <div className="text-right">{option.carbs}g</div>

                {isChecked && (
                  <div className="col-span-6 flex gap-4 mt-2 ml-8">
                    <button
                      className={`px-4 py-1 rounded-full ${
                        optionQuantities[option.name] === 'Normal'
                          ? 'bg-[#7C2D53] text-white'
                          : 'bg-gray-200'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuantity(option.name, 'Normal');
                      }}
                    >
                      Normal
                    </button>
                    <button
                      className={`px-4 py-1 rounded-full ${
                        optionQuantities[option.name] === 'Double'
                          ? 'bg-[#7C2D53] text-white'
                          : 'bg-gray-200'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuantity(option.name, 'Double');
                      }}
                    >
                      Double
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full font-mulish">
      {/* Sticky Top Summary Bar */}
      <div
        className="sticky top-20 z-20 bg-amber-50 border-b px-6 lg:px-16 py-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 800 }}
      >
        <button
          onClick={() => navigate('/menu')}
          className="text-xl font-bold text-[#7C2D53] hover:underline self-start md:self-auto"
        >
          ← Back
        </button>

        {/* Center: image + title/description side by side */}
        <div className="flex items-center gap-6 flex-1 justify-center">
          <img
            src={heroImage}
            alt={meal?.name || mealName}
            className="h-24 w-auto md:h-32 lg:h-36 object-contain"
            loading="eager"
          />
          <div className="text-left max-w-md">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#7C2D53]">
              {meal?.name || mealName}
            </h1>
            <p className="text-gray-700 mt-1 text-sm md:text-base">
              {meal.description}
            </p>
          </div>
        </div>

        {/* Nutrition summary + note */}
        <div className="flex flex-col items-center md:items-end gap-1">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <p className="text-2xl md:text-4xl lg:text-5xl font-bold">
              {total.cal} <span className="text-base md:text-lg lg:text-2xl">cal</span>
            </p>
            <div className="flex gap-4 text-xs md:text-sm lg:text-lg">
              <p className="font-semibold">{total.fat}g Fat</p>
              <p className="font-semibold">{total.protein}g Protein</p>
              <p className="font-semibold">{total.carbs}g Carbs</p>
            </div>
          </div>
          <div className="text-xs text-gray-600 italic mt-1">
            (this is a sample image)
          </div>
        </div>
      </div>

      {/* Main Content - White Background */}
      <div className="bg-white w-full px-6 py-10 lg:px-16">
        {/* Structured flow for Basmati & Roti; original "Choose Any" for others */}
        {!isStructuredMeal ? (
          <div>
            <h2
              className="text-xl font-bold text-[#7C2D53] mb-3 uppercase"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 800 }}
            >
              Choose Any
            </h2>
            <p className="text-sm mb-4 text-gray-600">Add optional ingredients below.</p>

            <div className="grid grid-cols-6 font-semibold text-sm text-gray-600 border-b border-gray-300 mb-2">
              <div className="col-span-2">Ingredient</div>
              <div className="text-right">Calories</div>
              <div className="text-right">Fat</div>
              <div className="text-right">Protein</div>
              <div className="text-right">Carbs</div>
            </div>

            <ul className="space-y-2">
              {meal.options.map((option) => {
                const isChecked = selectedOptions.some((o) => o.name === option.name);
                return (
                  <li
                    key={option.name}
                    className="grid grid-cols-6 items-center py-3 border-b hover:bg-amber-50 cursor-pointer"
                    onClick={() => toggleOption(option)}
                  >
                    <div className="col-span-2 flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        readOnly
                        className="w-5 h-5 accent-[#7C2D53]"
                      />
                      <span className="font-semibold">{option.name}</span>
                    </div>
                    <div className="text-right">{option.cal} cal</div>
                    <div className="text-right">{option.fat}g</div>
                    <div className="text-right">{option.protein}g</div>
                    <div className="text-right">{option.carbs}g</div>

                    {isChecked && (
                      <div className="col-span-6 flex gap-4 mt-2 ml-8">
                        <button
                          className={`px-4 py-1 rounded-full ${
                            optionQuantities[option.name] === 'Normal'
                              ? 'bg-[#7C2D53] text-white'
                              : 'bg-gray-200'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuantity(option.name, 'Normal');
                          }}
                        >
                          Normal
                        </button>
                        <button
                          className={`px-4 py-1 rounded-full ${
                            optionQuantities[option.name] === 'Double'
                              ? 'bg-[#7C2D53] text-white'
                              : 'bg-gray-200'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuantity(option.name, 'Double');
                          }}
                        >
                          Double
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <>
            {renderSection('CHOOSE YOUR PROTEIN', proteinOptions)}
            {renderSection('SAUCE', sauceOptions)}
            {renderSection('TOPPINGS', toppingOptions)}
          </>
        )}

        {/* Contact Button */}
        <div className="bg-white py-6 px-4 flex justify-center z-[300]">
          <a
            href="mailto:desieatsus@outlook.com"
            className="px-6 py-3 bg-[#f16323] text-white hover:bg-yellow-500 rounded-full font-bold border border-black hover:scale-105 transition-all duration-300 shadow-lg"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 800 }}
          >
            Share Order
          </a>
        </div>
      </div>
    </div>
  );
};

export default Details;
