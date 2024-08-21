// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CarListing from './pages/CarListing';
import CarDetails from './pages/CarDetail';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup'
import CartPage from './components/CartPage';
import SearchResults from './pages/SearchResults';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/CarDetail" element={<CarDetails />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/CarListing" element={<CarListing />} />
        <Route path="/cars/:id" element={<CarDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
