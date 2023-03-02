import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SchoolsGroup from "./SchoolsGroup";

function MainMap() {
  return (
    <MapContainer center={[45.4, -122.6819]} zoom={10} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[45.5218, -122.6819]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <SchoolsGroup />
    </MapContainer>
  );
}

export default MainMap;
