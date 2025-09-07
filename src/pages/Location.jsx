import React from 'react';

const Location = () => {
  const locations = [
    { name: 'Desi Eats - Babson', address: '231 Forest St, Babson Park, MA 02457' },
    
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8 relative overflow-hidden">
      {/* Blurs Container */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-[#ffd632] opacity-50 blur-[100px] rounded-full -translate-x-[270%] translate-y-[10%]"></div>
        <div className="absolute top-[50%] left-[800px] h-[400px] w-[600px] bg-[rgb(255,124,95)] opacity-60 blur-[100px] rounded-full translate-x-[90%]"></div>
      </div>

      {/* Content Container */}
      <div className="max-w-screen-lg mx-auto z-[200] relative">
        <h1 
          className="text-5xl font-bold text-[#7C2D53] mb-6 z-[300]"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 800 }}
        >
          Our Locations
        </h1>

        <ul className="space-y-6 z-[300] relative">
          {locations.map((loc, index) => (
            <li
              key={index}
              className="p-6 bg-amber-100 border rounded shadow hover:bg-amber-200 transition relative z-[300]"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 800 }}
            >
              <h2 className="text-2xl font-semibold text-[#7C2D53] z-[300]">{loc.name}</h2>
              <p className="text-lg text-gray-700 z-[300]">{loc.address}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Location;
