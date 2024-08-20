import { configureStore } from "@reduxjs/toolkit";
import carReducer from "../Redux/carSlice";

export const store = configureStore({
  reducer: {
    car: carReducer,
  },
});
