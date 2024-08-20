import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function CarDetails() {
  const { id } = useParams(); // Get car ID from URL
  const car = useSelector((state) => state.car.selectedCar); // Get selected car from Redux store

  if (!car || car.id !== parseInt(id)) {
    return <div>No Car Found</div>; // Fallback if no car is selected
  }

  return (
    <div className="car-details">
      <h1>{car.make} {car.model}</h1>
      <p>Year: {car.year}</p>
      {/* Add more details here */}
    </div>
  );
}

export default CarDetails;
