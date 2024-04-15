import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cityData: [],
  status: "idle",
  error: null,
};

export const fetchCityData = createAsyncThunk(
  "city/fetchCityData",
  async () => {
    try {
      const response = await fetch(
        "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100"
      );
      const data = await response.json();
      return data.results.map((item, index) => ({
        id: index + 1,
        country: item.label_en,
        state: item.ascii_name,
        population: item.population,
        timezone: item.timezone,
        countryCode: item.country_code,
        coordinates: item.coordinates,
      }));
    } catch (error) {
      throw new Error("Failed to fetch city data");
    }
  }
);

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    sortByAlphabetically: (state) => {
      state.cityData.sort((a, b) => a.state.localeCompare(b.state));
    },
    sortByNonAlphabetically: (state) => {
      state.cityData.sort((a, b) => b.state.localeCompare(a.state));
    },
    sortByPopulationIncrease: (state) => {
      state.cityData.sort((a, b) => a.population - b.population);
    },
    sortByPopulationDecrease: (state) => {
      state.cityData.sort((a, b) => b.population - a.population);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCityData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cityData = action.payload;
      })
      .addCase(fetchCityData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  sortByAlphabetically,
  sortByNonAlphabetically,
  sortByPopulationIncrease,
  sortByPopulationDecrease,
} = citySlice.actions;
export default citySlice.reducer;

export const selectCityData = (state) => state.city.cityData;
