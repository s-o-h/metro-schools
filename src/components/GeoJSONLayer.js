import { GeoJSON, Popup, CircleMarker } from "react-leaflet";
import L from "leaflet";
const circleMarkerOptions = {
  radius: 5,
  stroke: true,
  color: "green",
  weight: 2,
  opacity: 0.5,
  fill: true,
  fillColor: "blue",
  fillOpacity: 0.5,
};
const circleMarkerOptions2 = {
  radius: 5,
  stroke: true,
  color: "orange",
  weight: 2,
  opacity: 0.5,
  fill: true,
  fillColor: "red",
  fillOpacity: 0.5,
};
function pointToLayer(feature, latlng) {
  // console.log(`feature do properties: `, feature.properties);
  // console.log(`feature do properties: `, feature.properties);

  if (feature.properties.COUNTY === "Washington") {
    return L.circleMarker(latlng, circleMarkerOptions2);
  }
  return L.circleMarker(latlng, circleMarkerOptions);
}

function GeoJSONLayer({ data }) {
  console.log(`data: `, data);
  return (
    <GeoJSON data={data} pointToLayer={pointToLayer}>
      Before
      <Popup>{data.properties}</Popup>
    </GeoJSON>
  );
}

export default GeoJSONLayer;
