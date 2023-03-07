import React from "react";
import { SchoolsContext } from "./SchoolsProvider";

function FeatureForm() {
  const { initialSchools, schools, setSchools } =
    React.useContext(SchoolsContext);
  const countyArray = arrayFromSet(initialSchools, "COUNTY");
  const typeArray = arrayFromSet(initialSchools, "TYPE");
  const gradeArray = arrayFromSet(initialSchools, "GRADE");
  const districtArray = arrayFromSet(initialSchools, "DISTRICT");
  const levelNameArray = arrayFromSet(initialSchools, "LEVEL_NAME");
  const zipCodeArray = arrayFromSet(initialSchools, "ZIP_CODE");
  const cityArray = arrayFromSet(initialSchools, "CITY");

  const [zipCode, setZipCode] = React.useState("");
  const [county, setCounty] = React.useState("countyArray[0]");

  function arrayFromSet(data, propertyName) {
    const dataSet = new Set(data.map((item) => item.properties[propertyName]));
    dataSet.delete(null);
    const uniqueArray = [...dataSet];
    const sortedArray = uniqueArray.sort();
    return sortedArray;
  }

  function handleRadioChange(
    event,
    initialData,
    setData,
    property,
    setProperty
  ) {
    const newValue = event.target.value;
    const newData = [...initialData];
    const newSet = newData.filter(
      (feature) => feature.properties[property] === newValue
    );
    setData(newSet);
    setProperty(newValue);
  }

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
      <fieldset>
        <legend>Select 'Name Here'</legend>
        {levelNameArray.map((option) => (
          <div key={option}>
            <input
              type="checkbox"
              id={option}
              value={option}
              checked={true}
              onChange={() => console.log(`${option} changed`)}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </fieldset>
      <fieldset>
        <legend>Select County</legend>
        {countyArray.map((option2) => (
          <div key={option2}>
            <input
              type="radio"
              name="current-county"
              id={option2}
              value={option2}
              checked={option2 === county}
              onChange={(event) =>
                handleRadioChange(
                  event,
                  initialSchools,
                  setSchools,
                  "COUNTY",
                  setCounty
                )
              }
            />
            <label htmlFor={option2}>{option2}</label>
          </div>
        ))}
      </fieldset>
    </form>
  );
}

export default FeatureForm;
