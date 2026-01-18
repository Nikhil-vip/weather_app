import { useNavigate } from "react-router-dom";
import "./Footer.css";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div id="footer_container">
        <div id="about">
          <h6
            id="privacy"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/Privacy.jsx")}
          >
            Privacy Policy
          </h6>

          <h6 id="about_us"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/tendays")}>About Us</h6>
        </div>

        <div id="links">
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <FaGithub size={30} />
          </a>

          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram size={30} />
          </a>

          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedin size={30} />
          </a>
        </div>

        <p>© 2026 WeatherApp. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
