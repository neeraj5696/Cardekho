import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../components/CartPage.css'; // Ensure you have a corresponding CSS file

const CartPage = () => {
  const cart = useSelector((state) => state.car.cart);
  const cars = useSelector((state) => state.car.cars); // Assuming you have the full car data in the store
  const navigate = useNavigate();

  const cartItems = cars.filter((car) => cart.has(car.id));

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <button className="back-btn" onClick={handleBackClick}>Back to Catalog</button>
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((car) => (
            <div key={car.id} className="cart-item">
              <div className="cart-image">
                <img src={car.image || 'https://via.placeholder.com/150'} alt={car.make} />
              </div>
              <div className="cart-details">
                <h2>{car.make} {car.model}</h2>
                <p>{car.year}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
