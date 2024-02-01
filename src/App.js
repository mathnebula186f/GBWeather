// App.js
import React, { useState, useEffect } from "react";
import WeatherForm from "./WeatherForm";
import WeatherDetails from "./WeatherDetails";
import Forecast from "./Forecast";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("weatherData");
    if (storedData) {
      setWeatherData(JSON.parse(storedData));
      console.log(JSON.parse(storedData));
    }
  }, []);

  const handleWeatherData = (data, err) => {
    if (err) {
      setError(err);
    } else {
      setWeatherData(data);
      localStorage.setItem("weatherData", JSON.stringify(data));
      setError(null);
    }
  };

  return (
    <div className="app">
      {!weatherData ? (
        <WeatherForm onWeatherData={handleWeatherData} />
      ) : (
        <>
          <WeatherDetails data={weatherData} />
          <Forecast data={weatherData} />
        </>
      )}
      {error && <div className="error"></div>}
    </div>
  );
};

export default App;
