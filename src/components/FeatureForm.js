import React from "react";
import { SchoolsContext } from "./SchoolsProvider";
import CheckboxGroup from "./CheckboxGroup";
import RadioGroup from "./RadioGroup";
import SelectGroup from "./SelectGroup";

function FeatureForm() {
  const { schools, setSchools, availableOptions } =
    React.useContext(SchoolsContext);

  const { COUNTIES, TYPES, GRADES, DISTRICTS, LEVEL_NAMES, ZIPCODES, CITIES } =
    availableOptions;

  function handleSubmit(event) {
    event.preventDefault();
    // setSchools(newSchools);
  }
  return (
    <form onSubmit={handleSubmit}>
      <p>Feature Form</p>
      <SelectGroup propertyName={"CITY"} options={CITIES} />
      <SelectGroup propertyName={"DISTRICT"} options={DISTRICTS} />
    </form>
  );
}

// <SelectGroup propertyName={"county"} options={counties} />
// <SelectGroup propertyName={"district"} options={districts} />
// <SelectGroup propertyName={"grade"} options={grades} />
// <SelectGroup propertyName={"levelName"} options={levelNames} />
// <SelectGroup propertyName={"type"} options={types} />
// <SelectGroup propertyName={"zipCode"} options={zipCodes} />
export default FeatureForm;
