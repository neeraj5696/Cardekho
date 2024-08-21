import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import '../pages/CarDetail.css'; // Ensure this path is correct

function CarDetails() {
  const { id } = useParams(); // Get car ID from URL
  const car = useSelector((state) => state.car.selectedCar); // Get selected car from Redux store

  if (!car || car.id !== parseInt(id)) {
    return <div className="no-car">No Car Found</div>; // Fallback if no car is selected
  }

  return (
    <div className="car-details">
      <div className="car-poster">
        <img src={car.image || 'https://via.placeholder.com/300x200'} alt={`${car.make} ${car.model}`} />
      </div>
      <div className="car-info">
        <h1>{car.make} {car.model}</h1>
        <div className="car-details-content">
          <p><strong>Year:</strong> {car.year}</p>
          <p><strong>Type:</strong> {car.type}</p>
          <p><strong>Description:</strong> {car.description || 'No description available'}</p>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;
