import React from "react";
import { FeatureGroup, Circle, Popup } from "react-leaflet";
import { SchoolsContext } from "./SchoolsProvider";

function SchoolsGroup() {
  const { schools } = React.useContext(SchoolsContext);

  return (
    <div>
      {schools.map(({ properties, geometry }) => {
        const { FID, NAME, ADDRESS, CITY, STATE, ZIPCODE } = properties;
        const { coordinates } = geometry;
        const [lng, lat] = coordinates;

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
              center={[lat, lng]}
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
    </div>
  );
}

export default SchoolsGroup;
