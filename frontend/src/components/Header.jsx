import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import '../components/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const cars = useSelector((state) => state.car.cars); // Access cars data from Redux store
  const cartCount = useSelector((state) => state.car.cart.length); // Access cart count from Redux store

  const handleSearch = () => {
    const filteredCars = cars.filter((car) => 
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Navigate to a results page or handle the filtered cars here
    navigate('/search-results', { state: { filteredCars } });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="header">
      <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src="https://stimg.cardekho.com/pwa/img/CD-default-logo.svg" alt="CarDekho" className="logo-img" />
      </div>
      <div className="header-right">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown} // Trigger search on Enter key press
          />
        </div>
        <div className="user-login">
          <FaUserCircle className="user-icon" />
          <span onClick={() => navigate('/login')} className="login-register" style={{ cursor: 'pointer' }}>
            Login / Register
          </span>
          <div className="cart-container" onClick={() => navigate('/cart')}>
            <FaShoppingCart className="cart-icon" />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
