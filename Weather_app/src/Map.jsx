import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for the missing marker icon issue in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const Mapp = () => {
  const lat = parseFloat(sessionStorage.getItem("latt")) || 51.505;
  const lon = parseFloat(sessionStorage.getItem("long")) || -0.09;
  const position = [lat, lon];

  const key = "1dbec7dca71d665f91ade90ec2169ba8";
  // The OpenWeatherMap layer URL
  const weather_url = `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${key}`;

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={6} // Zoomed out a bit so you can see the weather patterns better
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        {/* BASE LAYER: Street Map */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* WEATHER LAYER: Temperature Overlay */}
        <TileLayer
          attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          url={weather_url}
          opacity={0.5} // Set opacity so you can still see the map underneath
        />

        <Marker position={position}>
          <Popup>
            Coordinates: <br /> {lat}, {lon}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Mapp;