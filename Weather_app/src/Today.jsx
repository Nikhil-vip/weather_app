import React, { useState, useEffect } from "react";
import "./today.css";
import bgpic from "./assets/bgpic.jpg";
import { FaSun, FaCloud, FaCompass, FaCloudRain, FaSnowflake, FaBolt, FaSmog, FaCloudSun } from "react-icons/fa";

const Today_box = () => {
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [condition, setCondition] = useState("");
  const [pic, setPic] = useState(null);
  const [days, setDays] = useState([]);
  const [week_temp_max, setWeek_temp_max] = useState([]);
  const [week_temp_min, setWeek_temp_min] = useState([]);
  const [latt, setLatt] = useState(null);
  const [long, setLong] = useState(null);
  const [weatherCode, setWeatherCode] = useState([]);

  // 1. Helper: Map code to Text and Icons
  const getWeatherDetails = (code) => {
    if (code === 0) return { text: "Clear Sky", icon: <FaSun size={50} /> };
    if (code >= 1 && code <= 3) return { text: "Partly Cloudy", icon: <FaCloudSun size={50} /> };
    if (code >= 45 && code <= 48) return { text: "Foggy", icon: <FaSmog size={50} /> };
    if (code >= 51 && code <= 55) return { text: "Drizzle", icon: <FaCloud size={50} /> };
    if (code >= 61 && code <= 65) return { text: "Rainy", icon: <FaCloudRain size={50} /> };
    if (code >= 71 && code <= 77) return { text: "Snowy", icon: <FaSnowflake size={50} /> };
    if (code >= 80 && code <= 82) return { text: "Rain Showers", icon: <FaCloudRain size={50} /> };
    if (code >= 95) return { text: "Thunderstorm", icon: <FaBolt size={50} /> };
    return { text: "Overcast", icon: <FaCloud size={50} /> };
  };

  // 2. LOAD: Session Storage
  useEffect(() => {
    const saved = sessionStorage.getItem("weatherdata");
    if (saved) {
      const parsed = JSON.parse(saved);
      setLocation(parsed.location);
      setTemperature(parsed.temperature);
      setCondition(parsed.condition);
      setDays(parsed.days);
      setWeek_temp_max(parsed.week_temp_max);
      setWeek_temp_min(parsed.week_temp_min);
      setWeatherCode(parsed.weatherCode);
      setLatt(parsed.latt);
      setLong(parsed.long);

      // Update the main icon based on saved condition code
      const details = getWeatherDetails(parsed.currentCode);
      setPic(details.icon);
    }
  }, []);

  // 3. SAVE: Sync state to Session Storage
  useEffect(() => {
    if (location || days.length > 0) {
      const dataToSave = {
        location, temperature, condition, days,
        week_temp_max, week_temp_min, weatherCode, latt, long
      };
      sessionStorage.setItem("weatherdata", JSON.stringify(dataToSave));
    }
  }, [location, temperature, condition, days, week_temp_max, week_temp_min, weatherCode, latt, long]);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
      const geoData = await geoRes.json();
      const city = geoData.city || geoData.locality || "Unknown";

      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`);
      const data = await res.json();

      const currentDetails = getWeatherDetails(data.current_weather.weathercode);

      setLocation(city);
      setTemperature(data.current_weather.temperature + "°C");
      setCondition(currentDetails.text);
      setPic(currentDetails.icon);
      setDays(data.daily.time);
      setWeek_temp_max(data.daily.temperature_2m_max);
      setWeek_temp_min(data.daily.temperature_2m_min);
      setWeatherCode(data.daily.weathercode);
      setLatt(lat);
      setLong(lon);

    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };

  const askLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
      },
      (error) => alert("Location access denied")
    );
  };

  return (
    <div className="weather-container">
      <div className="today_box"
        style={{
          height: "300px",
          width: "380px",
          backgroundImage: `url(${bgpic})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '15px',
          color: 'white'
        }}>
        <h3 id="location">{location || "Waiting for location..."}</h3>
        <div id="pic">{pic}</div>
        <h4 id="weather">{condition}</h4>
        <div id="temp">{temperature}</div>
      </div>

      <button id="location_button" onClick={askLocation} style={{ marginTop: '20px', cursor: 'pointer' }}>
        Current Location <FaCompass size={30} />
      </button>

      {latt && long && (
        <>
          <h1 id="weektitle">Next 7 Days</h1>
          <div className="weekly-grid">
            {days.map((day, i) => {
              const dayDetails = getWeatherDetails(weatherCode[i]);
              return (
                <div id="weekly_box" key={day}>
                  <h3>{day}</h3>
                  <div id="weather_info">
                    <div id="condd">{dayDetails.text}</div>
                    <div id="weather_tempp">
                      <span>Max: {week_temp_max[i]}°C</span>
                      <span>Min: {week_temp_min[i]}°C</span>
                    </div>
                    <div id="symbol">{dayDetails.icon}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>

  );
};

export default Today_box;