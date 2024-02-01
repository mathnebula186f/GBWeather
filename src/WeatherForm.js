import React, { useState } from "react";

const WeatherForm = ({ onWeatherData }) => {
  const [city, setCity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Store current city in local storage
      localStorage.setItem("currentCity", city);

      // Fetch weather data using API
      const data = await fetchWeatherData(city);
      onWeatherData(data, null);
    } catch (err) {
      onWeatherData(null, "City not found. Please try again.");
      alert("City not found. Please try again.");
    }
  };

  const fetchWeatherData = async (city) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    console.log("my APi key",process.env);
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("City not found. Please try again.");
      }
      const data = await response.json();
      console.log("Here is the Data=", data);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center flex-col"
    >
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full max-w-xs"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
      >
        Get Weather
      </button>
    </form>
  );
};

export default WeatherForm;
