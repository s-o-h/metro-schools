import React from "react";
import { SchoolsContext } from "./SchoolsProvider";

function SelectGroup({ propertyName, options }) {
  const {
    initialSchools,
    schools,
    setSchools,
    selectedOptions,
    setSelectedOptions,
    selectedSetFromOptions,
    getSchools,
    getAvailableOptions,
  } = React.useContext(SchoolsContext);

  // console.log(`selectedOptions from render: `, selectedOptions);
  // selectedSetFromOptions(initialSchools, selectedOptions);

  function handleChange(event) {
    const nextValue = event.target.value;
    const nextSelectedOptions = {
      ...selectedOptions,
      [propertyName]: nextValue,
    };
    // get schools from selected options
    const nextSchools = getSchools(schools, propertyName, nextValue);
    console.log(`nextSchools: `, nextSchools);

    // update available options based on schools
    const nextAvailableOptions = getAvailableOptions(nextSchools);
    console.log(`nextAvailableOptions: `, nextAvailableOptions);
    // setSelectedOptions
    // setSelectedOptions(nextSelectedOptions);
    // setSchools
    // setSchools(nextSchools);
    // setAvailableOptions
    // console.log(`schools: `, schools);
    // newSetFromSelectedOption(schools, propertyName, event.target.value);
  }
  // function handleChange(event) {
  //   // console.log(event.target.value);
  //   // console.log(`selectedOptions: `, selectedOptions);
  //   const newOptions = { ...selectedOptions };
  //   newOptions[propertyName] = event.target.value;
  //   // console.log(`newOptions: `, newOptions);
  //   selectedSetFromOptions(initialSchools, selectedOptions);
  //   setSelectedOptions(newOptions);
  // }

  return (
    <div>
      <label htmlFor={`${propertyName}-select`}>Select a {propertyName}</label>
      <select
        id={`${propertyName}-select`}
        value={selectedOptions[propertyName]}
        onChange={(event) => handleChange(event)}
      >
        <option value="">-- select a {propertyName} --</option>
        <optgroup label="districts">
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
