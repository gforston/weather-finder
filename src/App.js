import React, { useState, useEffect } from "react";
import "./App.css";

const API_KEY = "112a2df03d86ff9de935fdc6d1b94f55";

function App() {
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      const fetchWeather = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`
          );
          const data = await response.json();

          if (response.ok) {
            setWeather(data);
            setError("");
          } else {
            setError("City not found");
            setWeather(null);
          }
        } catch (error) {
          setError("An error occurred while fetching the data");
          setWeather(null);
        } finally {
          setLoading(false);
        }
      };

      fetchWeather();
    }
  }, [query, API_KEY]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      setQuery(city.trim());
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Weather Finder</h1>
      </header>
      <main>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {weather && (
          <div className="weather-info">
            <h2>{weather.name}</h2>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
