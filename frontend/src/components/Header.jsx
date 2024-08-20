import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';
import '../components/Header.css';
import { useSelector } from 'react-redux'; // Import useSelector

const Header = () => {
  const navigate = useNavigate();
  const cartCount = useSelector((state) => state.car.cart.size); // Access cart size from Redux

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleCartClick = () => {
    navigate('/cart'); // Navigate to cart page
  };

  return (
    <div className="header">
      <div className="logo" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
        <img 
          src="https://stimg.cardekho.com/pwa/img/CD-default-logo.svg" 
          loading="eager" 
          alt="CarDekho" 
          className="logo-img"
        />
      </div>
      <div className="header-right">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button ><MdSearch size={24} /></button> 
        </div>
        <div className="user-login">
          <FaUserCircle className="user-icon" />
          <span 
            onClick={handleLoginClick} 
            className="login-register" 
            style={{ cursor: 'pointer' }}
          >
            Login / Register
          </span>
          <div className="cart-container" onClick={handleCartClick}>
            <FaShoppingCart className="cart-icon" />
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
