import React from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css'; // Ensure this path is correct

const SearchResults = () => {
  const location = useLocation();
  
  // Extract filteredCars from location.state, default to an empty array
  const filteredCars = location.state?.filteredCars || [];

  return (
    <div className="search-results">
      <h1>Search Results</h1>
      <div className="results-list">
        {filteredCars.length === 0 ? (
          <p className="no-results">No cars found.</p>
        ) : (
          filteredCars.map((car) => (
            <div key={car.id} className="result-item">
              <div className="result-image">
                <img src={car.image || 'https://via.placeholder.com/150'} alt={`${car.make} ${car.model}`} />
              </div>
              <div className="result-details">
                <h2>{car.make} {car.model}</h2>
                <p><strong>Year:</strong> {car.year}</p>
                <p><strong>Type:</strong> {car.type}</p>
                <p><strong>Description:</strong> {car.description || 'No description available'}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResults;
