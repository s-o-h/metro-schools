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
    getPropertiesObject,
    selectPropertiesObject,
    setSelectPropertiesObject,
  } = React.useContext(SchoolsContext);
  console.log(`selectPropertiesObject: `, selectPropertiesObject);
  const propertyOptionsObject = selectPropertiesObject[propertyName];
  console.log(`propertyOptionsObject: `, propertyOptionsObject);

  const portlandSchools = schools.filter((school) => {
    return school.properties["CITY"] === "PORTLAND";
  });

  function handleChange(event) {
    //update selected options based on select change
    const nextValue = event.target.value;
    const nextSelectedOptions = {
      ...selectedOptions,
      [propertyName]: nextValue,
    };
    // console.log(`nextSelectedOptions: `, nextSelectedOptions);

    // get schools from selected options
    const nextSchools = getSchools(schools, propertyName, nextValue);
    // console.log(`nextSchools: `, nextSchools);

    // update selectProperties options based on schools
    const nextSelectPropertiesObject = getPropertiesObject(
      nextSchools,
      availableOptions
    );

    // setSelectedOptions
    setSelectedOptions(nextSelectedOptions);
    // setSchools
    setSchools(nextSchools);
    //setSelectPropertiesObject
    setSelectPropertiesObject(nextSelectPropertiesObject);
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
            propertyOptionsObject.map((object) => (
              <option
                key={object.value}
                value={object.value}
                disabled={object.disabled}
              >
                {object.value}: ({object.count})
              </option>
            ))
          }
        </optgroup>
      </select>
    </div>
  );
}

export default SelectGroup;
