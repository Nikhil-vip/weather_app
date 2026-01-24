import logo from './assets/weatherix_logo.png';
import './Navbar.css';
import { useEffect, useState } from 'react';

const Nav = () => {
  const [city, setcity] = useState("");

  // 1. LOAD: Get city from session on mount
  useEffect(() => {
    const savedCity = sessionStorage.getItem("cityName"); // Use getItem, not setItem
    if (savedCity) {
      setcity(savedCity);
    }
  }, []);

  // 2. SAVE: Store city name whenever it changes
  useEffect(() => {
    if (city) {
      sessionStorage.setItem("cityName", city);
    }
  }, [city]);

  return (
    <div id="navbar">
      <div id="logo_conatiner">
        <h1 id='logo'>Weatherix</h1>
        <img src={logo} alt="Logo" className="logo-img" />
      </div>

      <input
        type="text"
        id="search"
        placeholder="Search city..."
        onChange={(e) => setcity(e.target.value)}
        value={city}
      />
    </div>
  );
};

export default Nav;