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

  function createOptionGroupLabel(string) {
    const lastLetter = string.slice(-1);
    const valueToTest = "Y";
    const ending = lastLetter === valueToTest ? "IES" : "S";
    const base =
      lastLetter === valueToTest ? string.slice(0, string.length - 1) : string;
    const label = `${base}${ending}`;

    return label;
  }

  const optionGroupLabel = createOptionGroupLabel(propertyName);

  const propertyOptionsObject = selectPropertiesObject[propertyName];

  function handleChange(event) {
    const nextValue = event.target.value;
    const nextSelectedOptions = {
      ...selectedOptions,
      [propertyName]: nextValue,
    };

    const nextSchools = getSchools(schools, propertyName, nextValue);

    const nextSelectPropertiesObject = getPropertiesObject(
      nextSchools,
      availableOptions
    );

    setSelectedOptions(nextSelectedOptions);
    setSchools(nextSchools);
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
        <option key="default" disabled={true} value={""}>
          -- select a {propertyName} --
        </option>

        <optgroup label={optionGroupLabel}>
          {propertyOptionsObject.map((object) => (
            <option
              key={object.value}
              value={object.value}
              disabled={object.disabled}
            >
              {object.value}: ({object.count})
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
}

export default SelectGroup;
