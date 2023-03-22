import React from "react";
import schoolsData from "./../data/schools.json";

export const SchoolsContext = React.createContext();
const initialSchools = schoolsData?.features;

function getSchoolPropertyNames(schools) {
  const schoolItem = schools[0]?.properties;
  const schoolPropertyNames = Object.keys(schoolItem);

  return schoolPropertyNames;
}

function getAvailableOptions(schools) {
  const schoolPropertyNames = getSchoolPropertyNames(schools);

  const nextAvailableOptions = {};
  schoolPropertyNames.map((propertyName) => {
    const optionsArray = optionsArrayFromProperty(schools, propertyName);
    nextAvailableOptions[propertyName] = optionsArray;
    return optionsArray;
  });

  return nextAvailableOptions;
}

function optionsSetFromProperty(schools, propertyName) {
  const set = new Set(schools.map((item) => item.properties[propertyName]));
  return set;
}

function arrayFromSet(set) {
  set.delete(null);
  const uniqueArray = [...set];
  const sortedArray = uniqueArray.sort();
  return sortedArray;
}

function optionsArrayFromProperty(schools, propertyName) {
  const set = optionsSetFromProperty(schools, propertyName);
  const optionsArray = arrayFromSet(set);
  //TODO account for options with no items
  //TODO create count for each item
  return optionsArray;
}

function getSchools(schools, propertyName, option) {
  const newSet = new Set(
    schools.filter((item) => item.properties[propertyName] === option)
  );
  return [...newSet];
}

function SchoolsProvider({ children }) {
  const [schools, setSchools] = React.useState(initialSchools);

  const schoolPropertyNames = getSchoolPropertyNames(schools);
  const initialSelectedOptions = schoolPropertyNames.reduce(
    (accumulator, value) => {
      return { ...accumulator, [value]: "" };
    },
    {}
  );
  const [selectedOptions, setSelectedOptions] = React.useState(
    initialSelectedOptions
  );

  const initialAvailableOptions = getAvailableOptions(initialSchools);
  const [availableOptions, setAvailableOptions] = React.useState(
    initialAvailableOptions
  );

  const [allAvailableOptions, setAllAvailableOptions] = React.useState(
    initialAvailableOptions
  );

  const value = {
    schools,
    setSchools,
    getSchools,
    selectedOptions,
    setSelectedOptions,
    availableOptions,
    setAvailableOptions,
    getAvailableOptions,
  };

  return (
    <SchoolsContext.Provider value={value}>{children}</SchoolsContext.Provider>
  );
}

export default SchoolsProvider;
