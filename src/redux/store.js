import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slice/weatherSlice";
import cityReducer from "./slice/citySlice";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    city: cityReducer,
  },
});

export default store;
