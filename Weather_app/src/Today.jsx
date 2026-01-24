import React, { useState, useEffect } from "react";
import sunny from "./assets/sunny.png";
import "./today.css";

const Today_box = () => {
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [condition, setCondition] = useState("");
  const [pic, setPic] = useState(null);
  const [days, setDays] = useState([]);
  const [latt, setLatt] = useState(null);
  const [long, setLong] = useState(null);
  // 1. LOAD: Runs once when component mounts
  useEffect(() => {
    const saved = sessionStorage.getItem("weatherdata");
    if (saved) {
      const parsed = JSON.parse(saved);
      setLocation(parsed.location);
      setTemperature(parsed.temperature);
      setCondition(parsed.condition);
      setDays(parsed.days);
      setLatt(parsed.latt);
      setLong(parsed.long);
      // Re-map the icon based on the saved condition text or code
    }
  }, []);

  // 2. SAVE: Runs whenever any of these states change
  useEffect(() => {
    if (location || days.length > 0) {
      const dataToSave = { location, temperature, condition, days, latt, long };
      sessionStorage.setItem("weatherdata", JSON.stringify(dataToSave));
    }
  }, [location, temperature, condition, days, latt, long]);
  function mapWeatherCode(code) {
    if (code === 0) return { text: "Clear Sky", img: <img src={sunny} alt="Sunny" /> };
    if (code <= 3) return { text: "Partly Cloudy", img: "cloudy_pic_url" };
    if (code <= 48) return { text: "Foggy", img: "fog_pic_url" };
    if (code <= 55) return { text: "Drizzle", img: "drizzle_pic_url" };
    if (code <= 65) return { text: "Rainy", img: "rainy_pic_url" };
    if (code <= 77) return { text: "Snowy", img: "snow_pic_url" };
    if (code <= 82) return { text: "Rain Showers", img: "rainy_pic_url" };
    if (code >= 95) return { text: "Thunderstorm", img: "thunder_pic_url" };
    return { text: "Overcast", img: "default_pic_url" };
  }

  const askLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const askLocation = () => {
        if (!navigator.geolocation) {
          alert("Geolocation not supported");
          return;
        }

        navigator.geolocation.getCurrentPosition((position) => {

        });
      };
      fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
    });
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
      const geoData = await geoRes.json();
      const city = geoData.city || geoData.locality || "Unknown";
      setLocation(city);

      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weathercode&timezone=auto`);
      const data = await res.json();

      const weather = mapWeatherCode(data.current_weather.weathercode);
      setTemperature(data.current_weather.temperature + "°C");
      setCondition(weather.text);
      setPic(weather.img);
      setDays(data.daily.time);
      //setting state
      setLatt(lat);
      setLong(lon);
      //now save
      sessionStorage.setItem("lat", lat);
      sessionStorage.setItem("lon", lon);
      console.log("Saved coords:", lat, lon);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      <div className="today_box">
        <h3 id="location">{location || "Waiting for location..."}</h3>
        <div id="pic">{pic}</div>
        <h4 id="weather">{condition}</h4>
        <div id="temp">{temperature}</div>
      </div>

      <button id="location_button" onClick={askLocation}>
        Current Location
      </button>

      <h1 id="weektitle">Next 7 Days</h1>
      <h5 className="weekly">
        {Array.from({ length: 7 }).map((_, i) => (
          <div id="weekkly" key={i}>
            {days[i] || "-----"}
          </div>
        ))}
      </h5>
    </>
  );
};

export default Today_box;