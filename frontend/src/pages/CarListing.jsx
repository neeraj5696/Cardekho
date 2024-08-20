import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaShoppingCart, FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux"; // Redux dispatch for car details
import { setSelectedCar } from "../Redux/carSlice"; // Redux action for setting the selected car
import { useNavigate } from "react-router-dom"; // React Router for navigating to details page
import "../pages/CarListing.css";

function CarCatalog() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(new Set());
  const [page, setPage] = useState(0); // State to track the current page
  const dispatch = useDispatch(); // Redux dispatch
  const navigate = useNavigate(); // React Router navigate

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
         "x-rapidapi-key":
            "5a9d7e4273msh022af9bb82c5702p149b2cjsnace467de972c",
          "x-rapidapi-host": "car-data.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setCars((prevCars) => [...prevCars, ...response.data]); // Append new data to the list
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [page]); // Fetch data when page changes

  const handleAddToCart = (carId) => {
    setCart((prev) => {
      const updated = new Set(prev);
      if (updated.has(carId)) {
        updated.delete(carId); // Remove car if already in the cart
      } else {
        updated.add(carId); // Add car to the cart
      }
      return updated;
    });
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
            className={`catalog-item ${cart.has(car.id) ? "in-cart" : ""}`}
            onClick={() => handleCarClick(car)} // Handle car click
          >
            <div className="catalog-image">
              <button
                className={`cart-btn ${cart.has(car.id) ? "in-cart" : ""}`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click from triggering car details
                  handleAddToCart(car.id);
                }}
              >
                {cart.has(car.id) ? (
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
