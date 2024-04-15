import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (city, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0ecd7271e01f4161fa7487d6b744c562`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchForecastData = createAsyncThunk(
  "weather/fetchForecastData",
  async (city, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0ecd7271e01f4161fa7487d6b744c562`
      );

      const forecastData = response.data.list.filter((item) => {
        const sevenDaysFromNow = new Date();
        sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

        const forecastDate = new Date(item.dt_txt);

        return forecastDate <= sevenDaysFromNow;
      });

      return forecastData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,
    forecastData: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchForecastData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchForecastData.fulfilled, (state, action) => {
        state.loading = false;
        state.forecastData = action.payload;
        state.error = null;
      })
      .addCase(fetchForecastData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default weatherSlice.reducer;
