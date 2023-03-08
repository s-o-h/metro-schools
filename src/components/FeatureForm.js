import React from "react";
import { SchoolsContext } from "./SchoolsProvider";
import CheckboxGroup from "./CheckboxGroup";
import RadioGroup from "./RadioGroup";
import SelectGroup from "./SelectGroup";

function FeatureForm() {
  const { initialSchools, schools, setSchools } =
    React.useContext(SchoolsContext);
  const countyArray = arrayFromSet(initialSchools, "COUNTY");
  const typeArray = arrayFromSet(initialSchools, "TYPE");
  const gradeArray = arrayFromSet(initialSchools, "GRADE");
  const districtArray = arrayFromSet(initialSchools, "DISTRICT");
  console.log(`districtArray: `, districtArray);
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

  // Examples
  // const setA = new Set([1, 2, 3, 4]);
  // const setB = new Set([2, 3]);
  // const setC = new Set([3, 4, 5, 6]);

  // isSuperset(setA, setB); // returns true
  // union(setA, setC); // returns Set {1, 2, 3, 4, 5, 6}
  // intersection(setA, setC); // returns Set {3, 4}
  // symmetricDifference(setA, setC); // returns Set {1, 2, 5, 6}
  // difference(setA, setC); // returns Set {1, 2}

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
      <SelectGroup valuesArray={districtArray} />
      <CheckboxGroup valuesArray={levelNameArray} />
      <RadioGroup
        state={county}
        setState={setCounty}
        valuesArray={countyArray}
      />
    </form>
  );
}

export default FeatureForm;
