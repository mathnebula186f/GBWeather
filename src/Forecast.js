import React, { useState } from "react";

const Forecast = ({ data }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleUnits = () => {
    setIsCelsius((prevIsCelsius) => !prevIsCelsius);
  };

  const convertToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  const convertToFahrenheit = (kelvin) => {
    return (kelvin - 273.15) * (9 / 5) + 32;
  };

  const getTemperature = (kelvin) => {
    return isCelsius ? convertToCelsius(kelvin) : convertToFahrenheit(kelvin);
  };

  // Filter the forecast data to include only one forecast per day and limit to 5 days
  const filteredData = data.list.reduce((acc, forecast) => {
    const date = new Date(forecast.dt * 1000).toLocaleDateString(undefined, {
      timeZone: "UTC",
    });
    if (!acc[date] && Object.keys(acc).length < 5) {
      acc[date] = forecast;
    }
    return acc;
  }, {});

  return (
    <div className="forecast flex flex-wrap">
      <h2 className="text-3xl w-full mb-4">5-Day Forecast</h2>
      <div className="w-full mb-4">
        <button
          onClick={toggleUnits}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          {isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius"}
        </button>
      </div>
      {Object.values(filteredData).map((forecast) => (
        <div
          key={forecast.dt}
          className="bg-white rounded-lg shadow-md p-4 mb-4 mr-4 w-full md:w-1/2 lg:w-1/5"
        >
          <img
            src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
            alt="Weather Icon"
            className="w-10 h-10 mt-2"
          />
          {/* <h3 className="text-lg font-semibold mb-2">Date</h3> */}
          <p className="text-gray-600 mb-4">
            {new Date(forecast.dt * 1000).toLocaleDateString(undefined, {
              timeZone: "UTC",
            })}
          </p>
          <p>
            <span className="font-semibold">Temperature:</span>{" "}
            {getTemperature(forecast.main.temp).toFixed(2)}{" "}
            {isCelsius ? "°C" : "°F"}
          </p>
          <p>
            <span className="font-semibold">Description:</span>{" "}
            {forecast.weather[0].description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
