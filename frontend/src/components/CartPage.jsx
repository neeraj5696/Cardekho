import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import { removeFromCart } from '../Redux/carSlice';
import '../components/CartPage.css'; // Ensure this path is correct

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.car.cart);
  const cars = useSelector((state) => state.car.cars); // Access all cars to display details

  // Find car details based on cart items
  const cartItems = cars.filter((car) => cart.includes(car.id));

  const handleRemoveFromCart = (carId) => {
    dispatch(removeFromCart(carId)); // Remove item from cart
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="cart-items-container">
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty.</p>
        ) : (
          cartItems.map((car) => (
            <div key={car.id} className="cart-item-card">
              <div className="cart-item-details">
                <h2 className="cart-item-title">{car.make} {car.model}</h2>
                <p className="cart-item-year">Year: {car.year}</p>
                <p className="cart-item-type">Type: {car.type}</p>
                <p className="cart-item-description">Description: {car.description || 'No description available'}</p>
              </div>
              <button className="remove-from-cart-btn" onClick={() => handleRemoveFromCart(car.id)}>
                <FaTrashAlt /> Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
