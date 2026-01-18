
import React from 'react';
import sunny from "./assets/sunny.png";
import { useState, useEffect } from 'react';
import './today.css';
const Today_box = () => {
  const [loaction, setlocation] = useState(null);
  const [Temperature, setTemperature] = useState(null);
  const [condition, setcondition] = useState(null);
  const [pic, setpic] = useState(null);
  const [days, setdays] = useState([]);
  // get location
  const asklocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code&timezone=auto`;
      await fetch(url)
        .then(res => res.json())
        .then(data => {
          setdays(data.daily.time);
        })
    })
  };
  // reverse geocode
  async function reverseGeocode(lat, lon) {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    const data = await res.json();
    setlocation(data.city || data.locality);
  };

  //api call
  const apikey = '4c96567efcb44e3895a152749250708';
  const place = loaction;
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${'4c96567efcb44e3895a152749250708'}&q=${loaction}&days=10&aqi=no&alerts=no`;

  //fetch weather data
  const weather = async () => {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // today
        setTemperature(data.current.temp_c + "°C");
        setcondition(data.current.condition.text);
        // picture for condition
        const condition = data.current.condition.text.toLowerCase();

        if (
          condition.includes("sun") ||
          condition.includes("clear")
        ) {
          setpic(<img src={sunny} alt="Sunny" />);

        } else if (
          condition.includes("partly cloudy") ||
          condition.includes("cloud") ||
          condition.includes("overcast")
        ) {
          setpic("cloudy_pic_url");

        } else if (
          condition.includes("mist") ||
          condition.includes("fog") ||
          condition.includes("haze") ||
          condition.includes("freezing fog")
        ) {
          setpic("fog_pic_url");

        } else if (
          condition.includes("drizzle")
        ) {
          setpic("drizzle_pic_url");

        } else if (
          condition.includes("rain") ||
          condition.includes("shower")
        ) {
          setpic("rainy_pic_url");

        } else if (
          condition.includes("sleet") ||
          condition.includes("freezing rain") ||
          condition.includes("ice pellets")
        ) {
          setpic("sleet_pic_url");

        } else if (
          condition.includes("snow") ||
          condition.includes("blizzard") ||
          condition.includes("blowing snow")
        ) {
          setpic("snow_pic_url");

        } else if (
          condition.includes("thunder")
        ) {
          setpic("thunder_pic_url");

        } else {
          setpic("default_pic_url");
        }

        const tomorrow = data.forecast.forecastday[10];
        console.log(tomorrow);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };
  return (
    <>
      <div className="today_box">
        <h3 id='location' >{loaction}</h3>
        <div id='pic'>{pic}</div>
        <h4 id='weather'>{condition}</h4>
        <div id='temp'>{Temperature}</div>

      </div>
      <button id='location_button' onClick={() => { asklocation(); reverseGeocode(); weather(); }}>
        Current Location
      </button>
      <h1 id='weektitle'>Next 7 Days</h1>
      <h5 className="weekly">
        {days.length === 0
          ? Array.from({ length: 7 }).map((_, i) => (
            <div id='weekkly' key={i}>------</div>
          ))
          : days.map((t, i) => (
            <div id='weekkly' key={i}>
              {t}
              <div>hi</div>
              <div>dcd</div>
            </div>
          ))
        }
      </h5>

    </>
  )
}
export default Today_box;