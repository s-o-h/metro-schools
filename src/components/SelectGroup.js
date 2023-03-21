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
    getAllOptions,
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

    //test allOptions
    const allOptions = getAllOptions(schools);
    console.log(`allOptions: `, allOptions);

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
          {
            //TODO disable options with no items
            // { value, disabled: true, count: 0}
            options.map((option) => (
              <option key={option} value={option} disabled={false}>
                {option}
              </option>
            ))
          }
        </optgroup>
      </select>
    </div>
  );
}

export default SelectGroup;
