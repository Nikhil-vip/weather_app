import logo from './assets/weatherix_logo.png';
import './Navbar.css';

const Nav = () => {
  return (
    <div id="navbar">
      <div id="logo_conatiner">
        <h1 id='logo'>Weatherix</h1>
        <img src={logo} alt="Logo" className="logo-img" />
      </div>

      <input type="text" id="search" placeholder="Search city..." />
    </div>
  );
};

export default Nav;
