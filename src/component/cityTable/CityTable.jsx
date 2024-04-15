import { useEffect } from "react";
import {
  fetchCityData,
  selectCityData,
  sortByAlphabetically,
  sortByNonAlphabetically,
  sortByPopulationDecrease,
  sortByPopulationIncrease,
} from "../../redux/slice/citySlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CityTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cityData = useSelector(selectCityData);

  useEffect(() => {
    dispatch(fetchCityData());
  }, [dispatch]);

  const handleSortMethodChange = (e) => {
    const value = e.target.value;
    if (value === "alphabetically") {
      dispatch(sortByAlphabetically());
    } else if (value === "non-alphabetically") {
      dispatch(sortByNonAlphabetically());
    } else if (value === "population-increase") {
      dispatch(sortByPopulationIncrease());
    } else if (value === "population-decrease") {
      dispatch(sortByPopulationDecrease());
    }
  };

  const handleCityClick = (e) => {
    const cityIndex = e.target.parentElement.rowIndex - 1;
    const cityName = cityData[cityIndex].state;
    console.log(cityName);
    navigate(`/${cityName}`);
  };

  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent the default context menu
    const cityIndex = e.target.parentElement.rowIndex - 1;
    const cityName = cityData[cityIndex].state;
    window.open(`/${cityName}`, "_blank");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">City Data</h2>
      <div className="flex justify-center mb-4">
        <select
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onChange={handleSortMethodChange}
        >
          <option value="alphabetically">Sort A-Z</option>
          <option value="non-alphabetically">Sort Z-A</option>
          <option value="population-increase">Population Increase</option>
          <option value="population-decrease">Population Decrease</option>
        </select>
      </div>
      <table className="w-full border-collapse border border-gray-300 bg-transparent mx-2 w-fit">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 py-2 px-4">s.No.</th>
            <th className="border border-gray-300 py-2 px-4">Country</th>
            <th className="border border-gray-300 py-2 px-4">State</th>
            <th className="border border-gray-300 py-2 px-4">Population</th>
            <th className="border border-gray-300 py-2 px-4 hidden sm:table-cell">
              Timezone
            </th>
            <th className="border border-gray-300 py-2 px-4 hidden md:table-cell">
              Country Code
            </th>
            <th className="border border-gray-300 py-2 px-4 hidden lg:table-cell">
              Coordinates
            </th>
          </tr>
        </thead>
        <tbody onClick={handleCityClick} onContextMenu={handleContextMenu}>
          {cityData.map((city, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              style={{ cursor: "pointer" }}
            >
              <td className="border border-gray-300 py-2 px-4">{index + 1}</td>
              <td className="border border-gray-300 py-2 px-4">
                {city.country}
              </td>
              <td className="border border-gray-300 py-2 px-4">{city.state}</td>
              <td className="border border-gray-300 py-2 px-4">
                {city.population}
              </td>
              <td className="border border-gray-300 py-2 px-4 hidden sm:table-cell">
                {city.timezone}
              </td>
              <td className="border border-gray-300 py-2 px-4 hidden md:table-cell">
                {city.countryCode}
              </td>
              <td className="border border-gray-300 py-2 px-4 hidden lg:table-cell">
                {city.coordinates &&
                  `Lat: ${city.coordinates.lat}, Lon: ${city.coordinates.lon}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CityTable;
