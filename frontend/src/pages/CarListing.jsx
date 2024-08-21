import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaShoppingCart, FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCar, setAllCars, addToCart, removeFromCart } from "../Redux/carSlice";
import { useNavigate } from "react-router-dom";
import "../pages/CarListing.css";

function CarCatalog() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0); // State to track the current page
  const dispatch = useDispatch(); // Redux dispatch
  const navigate = useNavigate(); // React Router navigate
  const cart = useSelector((state) => state.car.cart); // Get cart from Redux store

  useEffect(() => {
    const fetchCars = async () => {
      const options = {
        method: "GET",
        url: "https://car-data.p.rapidapi.com/cars",
        params: {
          limit: "20",
          page: page.toString(), // Dynamic page
        },
        headers: {
          "x-rapidapi-key": "5a9d7e4273msh022af9bb82c5702p149b2cjsnace467de972c",
          "x-rapidapi-host": "car-data.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setCars((prevCars) => [...prevCars, ...response.data]); // Append new data to the list
        dispatch(setAllCars(response.data)); // Dispatch all car data to Redux store for search functionality
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [page, dispatch]); // Fetch data when page changes

  const handleAddToCart = (carId) => {
    if (cart.includes(carId)) {
      dispatch(removeFromCart(carId)); // Remove from cart
    } else {
      dispatch(addToCart(carId)); // Add to cart
    }
  };

  const handleCarClick = (car) => {
    dispatch(setSelectedCar(car)); // Dispatch action to set selected car
    navigate(`/cars/${car.id}`); // Navigate to car details page
  };

  const handleSeeMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number
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
            onClick={() => handleCarClick(car)} // Handle car click
          >
            <div className="catalog-image">
              <button
                className={`cart-btn ${cart.includes(car.id) ? "in-cart" : ""}`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click from triggering car details
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
