import React from "react";
import schoolsData from "./../data/schools.json";

export const SchoolsContext = React.createContext();
const allSchools = schoolsData?.features;

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

  return optionsArray;
}

function getSchools(schools, propertyName, option) {
  const newSet = new Set(
    schools.filter((item) => item.properties[propertyName] === option)
  );
  return [...newSet];
}

function SchoolsProvider({ children }) {
  const [schools, setSchools] = React.useState(allSchools);

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

  const initialAvailableOptions = getAvailableOptions(allSchools);
  const [availableOptions, setAvailableOptions] = React.useState(
    initialAvailableOptions
  );

  function getOptionObjects(schools, propertyName) {
    const options = availableOptions[propertyName];
    const optionObjectsArray = options.map((option) => {
      const matchingSchools = schools.filter((school) => {
        return school.properties[propertyName] === option;
      });

      const value = option;
      const count = matchingSchools.length;
      const disabled = count === 0 ? true : false;

      const optionObject = { value, count, disabled };

      return optionObject;
    });
    return optionObjectsArray;
  }

  function getPropertiesObject(schools, availableOptions) {
    const propertiesObject = {};
    for (const propertyName in availableOptions) {
      const optionObjectsArray = getOptionObjects(schools, propertyName);
      propertiesObject[propertyName] = optionObjectsArray;
    }
    return propertiesObject;
  }

  const initialSelectPropertiesObject = getPropertiesObject(
    schools,
    availableOptions
  );
  const [selectPropertiesObject, setSelectPropertiesObject] = React.useState(
    initialSelectPropertiesObject
  );

  const value = {
    allSchools,
    schools,
    setSchools,
    getSchools,
    selectedOptions,
    setSelectedOptions,
    availableOptions,
    setAvailableOptions,
    getAvailableOptions,
    getPropertiesObject,
    selectPropertiesObject,
    setSelectPropertiesObject,
  };

  return (
    <SchoolsContext.Provider value={value}>{children}</SchoolsContext.Provider>
  );
}

export default SchoolsProvider;
