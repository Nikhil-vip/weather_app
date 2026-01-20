import { Routes, Route } from "react-router-dom";
import "./App.css";

import Nav from "./Navbar.jsx";
import Selection from "./Select_Bar.jsx";
import Today_box from "./Today.jsx";
import Footer from "./Footer.jsx";
import PrivacyPolicy from "./privacy.jsx";
import Tendays from "./Tendays.jsx";
import About from "./About.jsx";
import Mapp from "./Map.jsx"
function App() {
  return (
    <>
      <Nav />
      <Selection />

      <Routes>
        <Route path="/" element={<Today_box />} />
        <Route path="/Today.jsx" element={<Today_box />} />
        <Route path="/privacy.jsx" element={<PrivacyPolicy />} />
        <Route path="/About.jsx" element={<About />} />
        <Route path="/Tendays.jsx" element={<Tendays />} />
        <Route path="/Map.jsx" element={<Mapp />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;


