import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/Home';
import Connect from './pages/Connect';
import Menu from './pages/Menu';
import Details from './pages/Details';
import Location from './pages/Location';



function LayoutRoutes() {
  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/details/:mealName" element={<Details />} />
        <Route path="/locations" element={<Location />} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LayoutRoutes />
    </BrowserRouter>
  );
}

export default App;
