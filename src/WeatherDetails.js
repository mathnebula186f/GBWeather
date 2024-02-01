import React from "react";

const WeatherDetails = ({ data }) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    // You can also redirect the user to the login page or perform any other action after logout if needed
  };

  const convertToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  return (
    <div className="weather-details bg-gray-100 rounded-lg shadow-md p-6 relative">
      <button
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded-lg absolute top-0 right-0 m-4"
        onClick={handleLogout}
      >
        Logout
      </button>
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Current Weather</h2>
        <p className="mb-2">
          Temperature: {convertToCelsius(data.list[0].main.temp).toFixed(2)} °C
        </p>
        <p className="mb-2">
          Min Temperature:{" "}
          {convertToCelsius(data.list[0].main.temp_min).toFixed(2)} °C
        </p>
        <p className="mb-2">
          Max Temperature:{" "}
          {convertToCelsius(data.list[0].main.temp_max).toFixed(2)} °C
        </p>
        <p className="mb-2">Humidity: {data.list[0].main.humidity}%</p>
        <p className="mb-2">
          Wind: {data.list[0].wind.speed} m/s, {data.list[0].wind.deg}&deg;
        </p>
        <p className="mb-2">
          Description: {data.list[0].weather[0].description}
        </p>
      </div>
      <img
        src={`http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`}
        alt="Weather Icon"
        className="w-20 h-20 absolute top-0 right-0 mr-6 mt-20" // Adjusted mt-6 to mt-20
      />
    </div>
  );
};

export default WeatherDetails;
