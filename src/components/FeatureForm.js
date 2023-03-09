import React from "react";
import { SchoolsContext } from "./SchoolsProvider";
import CheckboxGroup from "./CheckboxGroup";
import RadioGroup from "./RadioGroup";
import SelectGroup from "./SelectGroup";

function FeatureForm() {
  const { schools, setSchools, filterOptions } =
    React.useContext(SchoolsContext);

  const { counties, types, grades, districts, levelNames, zipCodes, cities } =
    filterOptions;

  function handleSubmit(event) {
    event.preventDefault();
    // setSchools(newSchools);
  }
  return (
    <form onSubmit={handleSubmit}>
      <p>Feature Form</p>
      <SelectGroup propertyName={"city"} options={cities} />
      <SelectGroup propertyName={"county"} options={counties} />
      <SelectGroup propertyName={"district"} options={districts} />
      <SelectGroup propertyName={"grade"} options={grades} />
      <SelectGroup propertyName={"levelName"} options={levelNames} />
      <SelectGroup propertyName={"type"} options={types} />
      <SelectGroup propertyName={"zipCode"} options={zipCodes} />
    </form>
  );
}

export default FeatureForm;
