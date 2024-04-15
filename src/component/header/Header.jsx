import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeatherData,
  fetchForecastData,
} from "../../redux/slice/weatherSlice";
import { useNavigate, useParams } from "react-router-dom"; // Import useHistory
import { FaSearch, FaSun } from "react-icons/fa";
import axios from "axios";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { city } = useParams();
  const [cityInput, setCityInput] = useState(city || "");
  const {
    data: weatherData,
    forecastData,
    loading,
    error,
  } = useSelector((state) => state.weather);

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  useEffect(() => {
    if (!city) {
      getDefaultCityWeather();
    }
  }, [city]);

  useEffect(() => {
    setCityInput(city || "");
  }, [city]);

  const getDefaultCityWeather = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const response = await axios.get(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=0ecd7271e01f4161fa7487d6b744c562`
        );

        setCityInput(response.data[0].name);
        dispatch(fetchWeatherData(response.data[0].name));
        dispatch(fetchForecastData(response.data[0].name));
      });
    } catch (error) {
      console.error("Error fetching default city:", error);
    }
  };

  const handleCityChange = (e) => {
    setCityInput(e.target.value);
  };

  const handleSearchClick = () => {
    if (cityInput.trim() !== "") {
      dispatch(fetchWeatherData(cityInput));
      dispatch(fetchForecastData(cityInput));
      navigate(`/${cityInput}`);
    }
  };

  const handleCityClick = (clickedCity) => {
    dispatch(fetchWeatherData(clickedCity));
    dispatch(fetchForecastData(clickedCity));
    navigate(`/${clickedCity}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const getNext7Days = () => {
    const today = new Date();
    const next7Days = Array.from({ length: 7 }, (_, index) => {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + index + 1);
      return nextDay.toLocaleDateString();
    });
    return next7Days;
  };

  return (
    <>
      <div className="bg-gradient-to-b min-h-screen flex flex-col justify-center items-center text-white">
        <div className="w-full max-w-md mt-8">
          <div className="relative flex justify-center items-center">
            <input
              type="text"
              value={cityInput}
              onChange={handleCityChange}
              placeholder="Enter city name"
              className="border-4 border-gray-400 mb-4 focus:outline-none focus:border-blue-500 py-2 px-6 pr-16 rounded-lg text-black w-full lg:w-auto"
            />
            <button
              onClick={handleSearchClick}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-black font-bold pt-[.25rem] pb-[1.25rem] pr-[1rem] lg:pr-[7rem] rounded-r-lg focus:outline-none focus:shadow-outline"
            >
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">{weatherData?.name}</h1>
          <p className="text-8xl font-light">
            {kelvinToCelsius(weatherData?.main.temp).toFixed(0)}° c
          </p>
          <p className="text-lg">{weatherData?.weather[0].description}</p>
          <p className="text-sm">
            H:{kelvinToCelsius(weatherData?.main.temp_max).toFixed(0)}° L:
            {kelvinToCelsius(weatherData?.main.temp_min).toFixed(0)}°
          </p>
        </div>

        <div className="w-full max-w-[73rem] overflow-x-auto">
          {forecastData && (
            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-2 text-white ml-[3rem]">
                7-Day Forecast
              </h2>
              <div className="flex flex-wrap justify-center">
                {forecastData.slice(0, 7).map((day, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 bg-opacity-40 rounded-lg p-4 text-white inline-block max-w-[150px] mb-4 mr-4 cursor-pointer"
                    style={{ minWidth: "150px" }}
                    onClick={() => {
                      handleCityClick(day.name); // Update history and fetch weather data when a city is clicked
                    }}
                  >
                    <div className="flex items-center mb-2">
                      <FaSun className="mr-2" />
                      <p>{getNext7Days()[index]}</p>
                    </div>
                    <p className="mb-2">
                      Temperature High:{" "}
                      {kelvinToCelsius(day.main.temp_max).toFixed(0)}°C
                    </p>
                    <p className="mb-2">
                      Temperature Low:{" "}
                      {kelvinToCelsius(day.main.temp_min).toFixed(0)}°C
                    </p>
                    <p className="mb-2">
                      Description: {day.weather[0].description}
                    </p>
                    <p className="mb-2">Wind Speed: {day.wind.speed} m/s</p>
                    <p>Humidity: {day.main.humidity}%</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
