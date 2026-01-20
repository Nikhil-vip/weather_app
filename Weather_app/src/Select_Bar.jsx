import { useNavigate } from "react-router-dom";
import './select_bar.css';
const Selection = () => {
  const navigate = useNavigate();
  return (
    <div className="selection-bar">
      <h7 id="today" style={{ cursor: "pointer" }} onClick={
        () => {
          navigate("Today.jsx")
          window.scrollTo({
            top: 10,
            behavior: "smooth"
          });
        }}>Today</h7>
      <h7 id="weekly" style={{ cursor: "pointer" }} onClick={() => {
        window.scrollTo({
          top: 400,
          behavior: "smooth"
        });
        navigate("/Today.jsx");
      }}>Weekly</h7>
      <h7 id="map" style={{ cursor: "pointer" }} onClick={() => navigate("/Map.jsx")}>Map</h7>
      <h7 id="ten-days" style={{ cursor: "pointer" }}
        onClick={() => navigate("/Tendays.jsx")}>10 Days</h7>
    </div>
  );
}
export default Selection;