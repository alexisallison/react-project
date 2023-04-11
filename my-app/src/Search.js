import React, { useState } from "react";
import axios from "axios";
export default function Search() {
  let [city, setCity] = useState("");
  let [query, setQuery] = useState(false);
  let [weather, setWeather] = useState(null);

  function showWeather(response) {
    setQuery(true);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "ca0db41e2e878c74a1dfc7ffece370d4";
    let units = "metric";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(url).then(showWeather);
  }

  let form = (
    <form className="SearchCity" onSubmit={handleSubmit}>
      <input type="search" placeholder="Type a City" onChange={updateCity} />
      <button type="submit">Search</button>
    </form>
  );

  if (query) {
    return (
      <div className="Search">
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {Math.round(weather.wind)} mph</li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
