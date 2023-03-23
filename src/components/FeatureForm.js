import React from "react";
import { SchoolsContext } from "./SchoolsProvider";
import CheckboxGroup from "./CheckboxGroup";
import RadioGroup from "./RadioGroup";
import SelectGroup from "./SelectGroup";

function FeatureForm() {
  const {
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
    console.log(propertyName);
    console.log("selectedOptions: ", selectedOptions);
    const nextValue = "";
    const nextSelectedOptions = {
      ...selectedOptions,
      [propertyName]: nextValue,
    };
    console.log(`nextSelectedOptions`, nextSelectedOptions);

    // get schools from selected options
    const currentSchools = [...schools];
    //make any option true
    const nextSchools = getSchools(currentSchools, propertyName, true);
    console.log(`nextSchools: `, nextSchools);

    // update selectProperties options based on schools
    const nextSelectPropertiesObject = getPropertiesObject(
      nextSchools,
      availableOptions
    );
    console.log(`nextSelectPropertiesObject: `, nextSelectPropertiesObject);
    // setSelectedOptions
    // setSelectedOptions(nextSelectedOptions);
    // setSchools
    // setSchools(nextSchools);
    //setSelectPropertiesObject
    // setSelectPropertiesObject(nextSelectPropertiesObject);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Feature Form</p>
      <SelectGroup propertyName={"CITY"} />
      <SelectGroup propertyName={"DISTRICT"} />
      <SelectGroup propertyName={"COUNTY"} />
      <SelectGroup propertyName={"DISTRICT"} />
      <SelectGroup propertyName={"GRADE"} />
      <SelectGroup propertyName={"LEVEL_NAME"} />
      <SelectGroup propertyName={"TYPE"} />
      <SelectGroup propertyName={"ZIPCODE"} />
      <div>
        {Object.keys(selectedOptions).map((key) => (
          <div key={key}>
            <div>key: {key}</div>
            <div>value: {selectedOptions[key]}</div>
            <button onClick={() => handleRemoveFilter(key)}>Remove</button>
          </div>
        ))}
      </div>
    </form>
  );
}

export default FeatureForm;
