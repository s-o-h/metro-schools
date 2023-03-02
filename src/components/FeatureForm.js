import React from "react";
import { SchoolsContext } from "./SchoolsProvider";

function FeatureForm() {
  const { schools, setSchools } = React.useContext(SchoolsContext);
  const [zipCode, setZipCode] = React.useState("");

  const newSchools = {
    ...schools,
  };

  function handleSubmit(event) {
    event.preventDefault();
    // setSchools(newSchools);
  }
  return (
    <form onSubmit={handleSubmit}>
      <p>Feature Form</p>
      <div>
        <label htmlFor="zip-code">Zip Code</label>
        <input
          id="zip-code"
          placeholder="Zip Code"
          title="Please enter a 5 digit numeric zip code"
          type="text"
          minLength={5}
          maxLength={5}
          pattern="[0-9]{5}"
          value={zipCode}
          onChange={(event) => setZipCode(event.target.value)}
        />
      </div>
    </form>
  );
}

export default FeatureForm;
