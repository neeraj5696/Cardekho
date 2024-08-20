import { createSlice } from '@reduxjs/toolkit';

const carSlice = createSlice({
  name: 'car',
  initialState: {
    selectedCar: null,
    cart: new Set(),
  },
  reducers: {
    setSelectedCar(state, action) {
      state.selectedCar = action.payload;
    },
    addToCart(state, action) {
      state.cart.add(action.payload);
    },
    removeFromCart(state, action) {
      state.cart.delete(action.payload);
    },
  },
});

export const { setSelectedCar, addToCart, removeFromCart } = carSlice.actions;
export default carSlice.reducer;
