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

  function getOptionObjects(schools, propertyName, options) {
    const optionObjectsArray = options.map((option) => {
      const matchingSchools = schools.filter((school) => {
        return school.properties[propertyName] === option;
      });

      const value = option;
      const count = matchingSchools.length;
      const disabled = count === 0 ? true : false;

      const optionObject = { value, count, disabled };

      return optionObject;
    });
    console.log(`optionObjectsArray in function: `, optionObjectsArray);
    return optionObjectsArray;
  }

  console.log(`checking optionObjectsArray`);
  const optionObjectsArray = getOptionObjects(schools, propertyName, options);
  console.log(`optionObjectsArray: `, optionObjectsArray);
  const [optionObjects, setOptionObjects] = React.useState(optionObjectsArray);
  console.log(`optionObjects atTop: `, optionObjects);

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

    //test option objects on handle change
    const nextOptionObjects = getOptionObjects(
      nextSchools,
      propertyName,
      options
    );
    console.log(`nextOptionObjects: `, nextOptionObjects);

    // setSelectedOptions
    setSelectedOptions(nextSelectedOptions);
    // setSchools
    setSchools(nextSchools);
    // setAvailableOptions
    // setAvailableOptions(nextAvailableOptions);
    //setOptionObjects
    setOptionObjects(nextOptionObjects);
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
      <div>BREAK</div>
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
            optionObjects.map((object) => (
              <option
                key={object.value}
                value={object.value}
                disabled={object.disabled}
              >
                value: {object.value}: ({object.count})
              </option>
            ))
          }
        </optgroup>
      </select>
    </div>
  );
}

export default SelectGroup;
