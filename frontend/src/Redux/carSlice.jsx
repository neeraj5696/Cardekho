import { createSlice } from '@reduxjs/toolkit';

const carSlice = createSlice({
  name: 'car',
  initialState: {
    selectedCar: null,
    cart: [], // Use an array for cart
    cars: [],
  },
  reducers: {
    setAllCars: (state, action) => {
      state.cars = action.payload; 
    },
    setSelectedCar(state, action) {
      state.selectedCar = action.payload;
    },
    addToCart(state, action) {
      const carId = action.payload;
      if (!state.cart.includes(carId)) {
        state.cart.push(carId); // Add to cart
      }
    },
    removeFromCart(state, action) {
      const carId = action.payload;
      state.cart = state.cart.filter(id => id !== carId); 
    },
  },
});

export const { setAllCars, setSelectedCar, addToCart, removeFromCart } = carSlice.actions;
export default carSlice.reducer;
