import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mealsData from '../data/meals.json';

import img1 from '../assets/1.png';      // fallback
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

  // pick image (with fallback)
  const image =
    meal?.image && imageMap[meal.image] ? imageMap[meal.image] : img1;

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [optionQuantities, setOptionQuantities] = useState({});

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

  const toggleOption = (option) => {
    const exists = selectedOptions.find((o) => o.name === option.name);
    if (exists) {
      setSelectedOptions(selectedOptions.filter((o) => o.name !== option.name));
      const updatedQuantities = { ...optionQuantities };
      delete updatedQuantities[option.name];
      setOptionQuantities(updatedQuantities);
    } else {
      setSelectedOptions([...selectedOptions, option]);
      setOptionQuantities({ ...optionQuantities, [option.name]: 'Normal' });
    }
  };

  const setQuantity = (optionName, quantity) => {
    setOptionQuantities({ ...optionQuantities, [optionName]: quantity });
  };

  return (
    <div className="min-h-screen w-full font-mulish">
      {/* Sticky Top Summary Bar */}
      <div
        className="sticky top-20 z-20 bg-amber-50 border-b px-6 lg:px-16 py-6 flex flex-col md:flex-row justify-between items-center gap-6"
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
            src={image}
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

        {/* Nutrition summary */}
        {/* Nutrition summary */}
<div className="flex flex-col md:flex-row items-center gap-4">
  <p className="text-2xl md:text-4xl lg:text-5xl font-bold">
    {total.cal} <span className="text-base md:text-lg lg:text-2xl">cal</span>
  </p>
  <div className="flex gap-4 text-xs md:text-sm lg:text-lg">
    <p className="font-semibold">{total.fat}g Fat</p>
    <p className="font-semibold">{total.protein}g Protein</p>
    <p className="font-semibold">{total.carbs}g Carbs</p>
  </div>
</div>

      </div>

      {/* Main Content - White Background */}
      <div className="bg-white w-full px-6 py-10 lg:px-16">
        {/* Included Ingredient Section */}
        <div className="mb-10">
          <div
            className="grid grid-cols-6 font-semibold text-sm text-gray-600 border-b border-gray-300 mb-2"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 800 }}
          >
            <div className="text-lg font-bold text-[#7C2D53] uppercase col-span-2">
              Included Ingredient
            </div>
            <div className="text-right">Carbs</div>
            <div className="text-right">Calories</div>
            <div className="text-right">Fat</div>
            <div className="text-right">Protein</div>
          </div>

          <div className="grid grid-cols-6 items-center py-3 border-b">
            <div className="font-semibold col-span-2">{meal.base.name}</div>
            <div className="text-right ">{meal.base.carbs}g</div>
            <div className="text-right">{meal.base.cal} cal</div>
            <div className="text-right ">{meal.base.fat}g</div>
            <div className="text-right ">{meal.base.protein}g</div>
          </div>
        </div>

        {/* Options Section */}
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
            <div className="text-right">Carbs</div>
            <div className="text-right">Calories</div>
            <div className="text-right">Fat</div>
            <div className="text-right">Protein</div>
          </div>

          <ul className="space-y-2">
            {meal.options.map((option) => (
              <li
                key={option.name}
                className="grid grid-cols-6 items-center py-3 border-b hover:bg-amber-50 cursor-pointer"
                onClick={() => toggleOption(option)}
              >
                <div className="col-span-2 flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectedOptions.some((o) => o.name === option.name)}
                    readOnly
                    className="w-5 h-5 accent-[#7C2D53]"
                  />
                  <span className="font-semibold">{option.name}</span>
                </div>
                <div className="text-right">{option.carbs}g</div>
                <div className="text-right">{option.cal} cal</div>
                <div className="text-right ">{option.fat}g</div>
                <div className="text-right ">{option.protein}g</div>

                {selectedOptions.some((o) => o.name === option.name) && (
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
            ))}
          </ul>

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
    </div>
  );
};

export default Details;
