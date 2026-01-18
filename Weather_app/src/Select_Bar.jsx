import './select_bar.css';
const Selection = () => {
  const handleClick = () => {
    console.log("clicked");
  }
  return (
    <div className="selection-bar">
      <h7 id="today" onClick={handleClick}>Today</h7>
      <h7 id="weekly" onClick={() => {
        window.scrollTo({
          top: 400,
          behavior: "smooth"
        });
      }}>Weekly</h7>
      <h7 id="map" onClick={handleClick}>Map</h7>
      <h7 id="ten-days" onClick={handleClick}>10 Days</h7>
    </div>
  );
}
export default Selection;