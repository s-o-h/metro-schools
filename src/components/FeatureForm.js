import React from "react";
import { SchoolsContext } from "./SchoolsProvider";
import SelectGroup from "./SelectGroup";

function FeatureForm() {
  const {
    allSchools,
    selectedOptions,
    setSelectedOptions,
    getSchools,
    schools,
    setSchools,
    getPropertiesObject,
    setSelectPropertiesObject,
    availableOptions,
  } = React.useContext(SchoolsContext);

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleRemoveFilter(propertyName) {
    const nextValue = "";
    const nextSelectedOptions = {
      ...selectedOptions,
      [propertyName]: nextValue,
    };

    const nextSchoolsFilterProperties = [];
    for (const propertyName in nextSelectedOptions) {
      const option = nextSelectedOptions[propertyName];
      if (option.length > 0) {
        nextSchoolsFilterProperties.push({ propertyName, option });
      }
    }

    const nextSchools = nextSchoolsFilterProperties.reduce(
      (schools, { propertyName, option }) =>
        getSchools(schools, propertyName, option),
      allSchools
    );

    const nextSelectPropertiesObject = getPropertiesObject(
      nextSchools,
      availableOptions
    );

    setSelectedOptions(nextSelectedOptions);
    setSchools(nextSchools);
    setSelectPropertiesObject(nextSelectPropertiesObject);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>{`Schools: ${schools.length}`}</p>
      <p>Feature Form</p>
      <SelectGroup propertyName={"CITY"} />
      <SelectGroup propertyName={"DISTRICT"} />
      <SelectGroup propertyName={"COUNTY"} />
      <SelectGroup propertyName={"GRADE"} />
      <SelectGroup propertyName={"LEVEL_NAME"} />
      <SelectGroup propertyName={"TYPE"} />
      <SelectGroup propertyName={"ZIPCODE"} />
      <div>
        {Object.keys(selectedOptions).map(
          (key) =>
            selectedOptions[key] && (
              <div key={key}>
                <div>key: {key}</div>
                <div>value: {selectedOptions[key]}</div>
                <button onClick={() => handleRemoveFilter(key)}>Remove</button>
              </div>
            )
        )}
      </div>
    </form>
  );
}

export default FeatureForm;
