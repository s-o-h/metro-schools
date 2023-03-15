import React from "react";
import schoolsData from "./../data/schools.json";

export const SchoolsContext = React.createContext();
const initialSchools = schoolsData?.features;

function getAvailableOptions(schools) {
  const schoolItem = schools[0]?.properties;
  const schoolProperties = Object.keys(schoolItem);

  const nextAvailableOptions = {};
  schoolProperties.map((propertyName) => {
    const optionsArray = optionsArrayFromProperty(schools, propertyName);
    nextAvailableOptions[propertyName] = optionsArray;
    return optionsArray;
  });

  return nextAvailableOptions;
}

function optionsSetFromProperty(data, propertyName) {
  const set = new Set(data.map((item) => item.properties[propertyName]));
  return set;
}

function arrayFromSet(set) {
  set.delete(null);
  const uniqueArray = [...set];
  const sortedArray = uniqueArray.sort();
  return sortedArray;
}

function optionsArrayFromProperty(data, propertyName) {
  const set = optionsSetFromProperty(data, propertyName);
  const optionsArray = arrayFromSet(set);
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
  // const schoolItem = schools[0]?.properties;
  // const schoolsKeys = Object.keys(schoolItem);
  // console.log(`schools keys: `, schoolsKeys);
  // const keysObject = { ...schoolsKeys };
  // console.log(`keysObject: `, keysObject);
  const initialSelectedOptions = {
    COUNTY: "",
    TYPE: "",
    GRADE: "",
    DISTRICT: "",
    LEVEL_NAME: "",
    ZIPCODE: "",
    CITY: "",
  };
  const [selectedOptions, setSelectedOptions] = React.useState(
    initialSelectedOptions
  );

  const initialAvailableOptions = getAvailableOptions(initialSchools);
  const [availableOptions, setAvailableOptions] = React.useState(
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
