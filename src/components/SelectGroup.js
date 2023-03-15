import React from "react";
import { SchoolsContext } from "./SchoolsProvider";

function SelectGroup({ propertyName }) {
  const {
    schools,
    setSchools,
    getSchools,
    selectedOptions,
    setSelectedOptions,
    availableOptions,
    setAvailableOptions,
    getAvailableOptions,
  } = React.useContext(SchoolsContext);

  const options = availableOptions[propertyName];

  function handleChange(event) {
    //update selected options based on select change
    const nextValue = event.target.value;
    const nextSelectedOptions = {
      ...selectedOptions,
      [propertyName]: nextValue,
    };
    console.log(`nextSelectedOptions: `, nextSelectedOptions);

    // get schools from selected options
    const nextSchools = getSchools(schools, propertyName, nextValue);
    console.log(`nextSchools: `, nextSchools);

    // update available options based on schools
    const nextAvailableOptions = getAvailableOptions(nextSchools);
    console.log(`nextAvailableOptions: `, nextAvailableOptions);

    // setSelectedOptions
    setSelectedOptions(nextSelectedOptions);
    // setSchools
    setSchools(nextSchools);
    // setAvailableOptions
    setAvailableOptions(nextAvailableOptions);
  }

  return (
    <div>
      <label htmlFor={`${propertyName}-select`}>Select a {propertyName}</label>
      <select
        id={`${propertyName}-select`}
        value={selectedOptions[propertyName]}
        onChange={(event) => handleChange(event)}
      >
        <option value="">-- select a {propertyName} --</option>
        <optgroup label={`select a ${propertyName}`}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
}

export default SelectGroup;
