import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBookmark, FaRegBookmark } from "react-icons/fa"; // Importing icons

import "../pages/CarListing.css";

function CarListing() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarks, setBookmarks] = useState(new Set()); // Track bookmarked cars

  useEffect(() => {
    const fetchCars = async () => {
      const options = {
        method: "GET",
        url: "https://car-data.p.rapidapi.com/cars",
        params: {
          limit: "10",
          page: "0",
        },
        headers: {
          "x-rapidapi-key":
            "5a9d7e4273msh022af9bb82c5702p149b2cjsnace467de972c",
          "x-rapidapi-host": "car-data.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response)
        setCars(response.data); // Set the fetched data to state
      } catch (error) {
        setError(error); // Handle errors
      } finally {
        setLoading(false); // Set loading to false once done
      }
    };

    fetchCars();
  }, []); // Empty dependency array means this effect runs once on mount

  const toggleBookmark = (carId) => {
    setBookmarks((prev) => {
      const updated = new Set(prev);
      if (updated.has(carId)) {
        updated.delete(carId);
      } else {
        updated.add(carId);
      }
      return updated;
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="car-listing">
      <h1>Car Listings</h1>
      <div className="car-list">
        {cars.map((car) => (
          <div key={car.id} className="car-item">
            <div className="car-image">
              <button
                className={`bookmark-btn ${
                  bookmarks.has(car.id) ? "bookmarked" : ""
                }`}
                onClick={() => toggleBookmark(car.id)}
              >
                {bookmarks.has(car.id) ? <FaBookmark /> : <FaRegBookmark />}
              </button>
            </div>
            <div className="car-details">
              <h2>
                {car.make} {car.model}
              </h2>
              <p>{car.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarListing;
