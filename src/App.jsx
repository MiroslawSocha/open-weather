import { useEffect, useState } from "react";
import "./index.css";
import "./App.css";

const API_KEY = "a3dbf3f31566cafc500ed43d1b9f28e2";

function App() {
  const [city, setCity] = useState("Rzeszów");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pl`
      );
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setWeather(null);
      setError("Nie znaleziono miasta");
    }
  };

  const getSunrise = () => {
    const sunrise = new Date(weather.sys.sunrise * 1000);
    return sunrise.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSunset = () => {
    const sunset = new Date(weather.sys.sunset * 1000);
    return sunset.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather();
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="app">
      <h1>Aplikacja pogodowa</h1>
      <div className="search-section">
        <input
          type="text"
          placeholder="Wpisz nazwę miasta"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Szukaj</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>Temperatura: {weather.main.temp}℃</p>
          <p>Wschód słońca: {getSunrise()}</p>
          <p>Zachód słońca: {getSunset()}</p>
          <p>Wilgotność: {weather.main.humidity}%</p>
          <p>Ciśnienie: {weather.main.pressure} hPa</p>
          <p>Opis: {weather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
        </div>
      )}
    </div>
  );
}

export default App;
