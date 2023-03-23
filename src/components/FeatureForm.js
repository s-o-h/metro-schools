import React from "react";
import { SchoolsContext } from "./SchoolsProvider";
import CheckboxGroup from "./CheckboxGroup";
import RadioGroup from "./RadioGroup";
import SelectGroup from "./SelectGroup";

function FeatureForm() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Feature Form</p>
      <SelectGroup propertyName={"CITY"} />
      <SelectGroup propertyName={"DISTRICT"} />
      <SelectGroup propertyName={"COUNTY"} />
      <SelectGroup propertyName={"DISTRICT"} />
      {/* <SelectGroup propertyName={"GRADE"} />
      <SelectGroup propertyName={"LEVEL_NAME"} />
      <SelectGroup propertyName={"TYPE"} />
      <SelectGroup propertyName={"ZIPCODE"} /> */}
    </form>
  );
}

export default FeatureForm;
