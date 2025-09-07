import React from 'react';
import Hero from '../components/hero';
import MainContent from '../components/mainContent';
import MainUnder from '../components/mainUnder';



const Home = () => {
  return (
    <div className=" bg-amber-50 "style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 400 }}>
      
      <Hero />
       
       
      <MainContent />
      {/* Blurs Container */}
      
      <MainUnder />  
    </div>
  );
};

export default Home;
