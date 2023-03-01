import {
  MapContainer,
  TileLayer,
  Marker,
  FeatureGroup,
  Circle,
  Popup,
  CircleMarker,
} from "react-leaflet";
import GeoJSONLayer from "./GeoJSONLayer";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import schoolsData from "./../data/schools.json";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
const myIcon = L.divIcon();

function MainMap() {
  return (
    <MapContainer center={[45.4, -122.6819]} zoom={10} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[45.5218, -122.6819]} icon={myIcon} />
      <Marker position={[45.5218, -122.6819]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <CircleMarker center={[45.5218, -122.6819]} radius={10}>
        <Popup>
          A prettyCOOL CSS3 popup. <br /> Easily customizable.
        </Popup>
      </CircleMarker>

      {schoolsData?.features.map(({ properties, geometry }) => {
        const {
          FID,
          SCHOOL_ID,
          SCHINSTID,
          DISTINSTID,
          NCESSCHID,
          NCESDISTID,
          SITE_ID,
          PRIMARYUSE,
          NAME,
          ADDRESS,
          ADDRESS2,
          CITY,
          STATE,
          ZIPCODE,
          ZIP4,
          PHONE,
          LEVEL_NO,
          LEVEL_NAME,
          DIST_NO,
          DISTRICT,
          GRADE,
          TYPE,
          COUNTY,
          UPDATEDATE,
        } = properties;

        const { type, coordinates } = geometry;
        return (
          <FeatureGroup color="purple" key={FID}>
            <Popup>
              <p>{NAME}</p>
              <p>
                {ADDRESS} {CITY}, {STATE}, {ZIPCODE}
              </p>
              <button>More Info</button>
            </Popup>
            <Circle
              center={[geometry.coordinates[1], geometry.coordinates[0]]}
              fillColor="#ff7800"
              radius={500}
              color={"#000"}
              weight={1}
              opacity={1}
              fillOpacity={0.8}
            />
          </FeatureGroup>
        );
      })}
    </MapContainer>
  );
}

{
  /* <GeoJSONLayer data={schoolsData?.features}></GeoJSONLayer> */
}
export default MainMap;
