// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CarListing from './pages/CarListing';
import CarDetails from './pages/CarDetail';
import About from './pages/About';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/CarDetail" element={<CarDetails />} />
        <Route path="/CarListing" element={<CarListing />} />
      </Routes>
    </Router>
  );
};

export default App;
