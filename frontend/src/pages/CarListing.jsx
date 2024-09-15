import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaShoppingCart, FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCar, setAllCars, addToCart, removeFromCart } from "../Redux/carSlice";
import { useNavigate } from "react-router-dom";
import "../pages/CarListing.css";

function CarCatalog() {
  const [cars, setCars] = useState([]); // State to store fetched cars
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [page, setPage] = useState(0); // State to track the current page
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 
  const cart = useSelector((state) => state.car.cart); 

  useEffect(() => {
    const fetchCars = async () => {
      const options = {
        method: "GET",
        url: "http://localhost:3000/cars", // Pointing to the backend server
        params: {
          limit: 20, // Fetch 20 cars per request
          page: page, // Current page number
        },
      };

      try {
        const response = await axios.request(options);
        setCars((prevCars) => [...prevCars, ...response.data]); // Append new data to the list
        dispatch(setAllCars([...cars, ...response.data])); // Dispatch all car data to Redux store for search functionality
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [page, dispatch]); 

  const handleAddToCart = (carId) => {
    if (cart.includes(carId)) {
      dispatch(removeFromCart(carId));
    } else {
      dispatch(addToCart(carId));
    }
  };

  const handleCarClick = (car) => {
    dispatch(setSelectedCar(car)); 
    navigate(`/cars/${car.id}`); 
  };

  const handleSeeMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number to fetch the next 20 cars
  };

  if (loading && page === 0) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="car-catalog">
      <h1>Car Catalog</h1>
      <div className="catalog-list">
        {cars.map((car) => (
          <div
            key={car.id}
            className={`catalog-item ${cart.includes(car.id) ? "in-cart" : ""}`}
            onClick={() => handleCarClick(car)} 
          >
            <div className="catalog-image">
              <button
                className={`cart-btn ${cart.includes(car.id) ? "in-cart" : ""}`}
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleAddToCart(car.id);
                }}
              >
                {cart.includes(car.id) ? (
                  <>
                    <FaShoppingCart /> In Cart
                  </>
                ) : (
                  <>
                    <FaCartPlus /> Add to Cart
                  </>
                )}
              </button>
            </div>
            <div className="catalog-details">
              <h2>
                {car.make} {car.model}
              </h2>
              <p>{car.year}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="see-more-btn" onClick={handleSeeMore}>
        See More
      </button>
    </div>
  );
}

export default CarCatalog;
