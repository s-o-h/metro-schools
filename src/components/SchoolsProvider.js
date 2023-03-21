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

function getAllOptions(schools) {
  const schoolPropertyNames = getSchoolPropertyNames(schools);

  const nextAllOptions = {};
  // i.e. propertyName === 'CITY'
  const testProperty = ["CITY"];
  // schoolPropertyNames.map((propertyName) => {
  testProperty.map((propertyName) => {
    const set = new Set(schools.map((item) => item.properties[propertyName]));
    set.delete(null);
    const uniqueArray = [...set];
    const optionsArray = uniqueArray.sort();

    console.log(`optionsArray in getAllOptions: `, optionsArray);
    // {
    // city: ['ALOHA', 'BANKS', etc ...]
    //}
    const objectArray = optionsArray.map((option) => {
      const includesSchool = schools.filter(
        (item) => item.properties[propertyName] === option
      );
      const schoolCount = includesSchool.length;
      const optionIsDisabled = schoolCount === 0 ? true : false;

      const object = {
        value: option,
        count: schoolCount,
        disabled: optionIsDisabled,
      };
      return object;
    });
    nextAllOptions[propertyName] = objectArray;
    // console.log(`objectArray in getAllOptions: `, objectArray);
    return objectArray;
  });

  return nextAllOptions;
}

// function getAllOptions(schools) {
//   const schoolPropertyNames = getSchoolPropertyNames(schools);
//   const nextAllOptions = {};

//   schoolPropertyNames.map((propertyName) => {
//     const set = optionsSetFromProperty(schools, propertyName);
//     const uniqueArray = [...set];
//     const sortedArray = uniqueArray.sort();
//     nextAllOptions[propertyName] = sortedArray;
//     return sortedArray;
//   });

//   return nextAllOptions;
// }

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
    getAllOptions,
  };

  return (
    <SchoolsContext.Provider value={value}>{children}</SchoolsContext.Provider>
  );
}

export default SchoolsProvider;
