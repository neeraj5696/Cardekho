import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Importing user icon from Font Awesome
import { MdSearch } from 'react-icons/md'; // Importing search icon from Material Design
import '../components/Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleHomeClick = () => {
    navigate('/');
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
          <button><MdSearch /></button> {/* Using search icon */}
        </div>
        <div className="user-login">
          <FaUserCircle className="user-icon" /> {/* Using user icon */}
          <span 
            onClick={handleLoginClick} 
            className="login-register" 
            style={{ cursor: 'pointer' }}
          >
            Login / Register
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
