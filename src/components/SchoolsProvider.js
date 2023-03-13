import React from "react";
import schoolsData from "./../data/schools.json";

export const SchoolsContext = React.createContext();

function SchoolsProvider({ children }) {
  const initialSchools = schoolsData?.features;
  const [schools, setSchools] = React.useState(initialSchools);

  const countyArray = optionsArrayFromProperty(initialSchools, "COUNTY");
  const typeArray = optionsArrayFromProperty(initialSchools, "TYPE");
  const gradeArray = optionsArrayFromProperty(initialSchools, "GRADE");
  const districtArray = optionsArrayFromProperty(initialSchools, "DISTRICT");
  const levelNameArray = optionsArrayFromProperty(initialSchools, "LEVEL_NAME");
  const zipCodeArray = optionsArrayFromProperty(initialSchools, "ZIPCODE");
  const cityArray = optionsArrayFromProperty(initialSchools, "CITY");

  const availableOptions = {
    COUNTIES: countyArray,
    TYPES: typeArray,
    GRADES: gradeArray,
    DISTRICTS: districtArray,
    LEVEL_NAMES: levelNameArray,
    ZIPCODES: zipCodeArray,
    CITIES: cityArray,
  };

  const initialOptions = {
    COUNTY: "",
    TYPE: "",
    GRADE: "",
    DISTRICT: "",
    LEVEL_NAME: "",
    ZIPCODE: "",
    CITY: "",
  };

  const [selectedOptions, setSelectedOptions] = React.useState(initialOptions);

  const initialAvailableOptions = getAvailableOptions(initialSchools);
  console.log(`initialAvailableOptions: `, initialAvailableOptions);

  // Examples
  // const setA = new Set([1, 2, 3, 4]);
  // const setB = new Set([2, 3]);
  // const setC = new Set([3, 4, 5, 6]);

  // isSuperset(setA, setB); // returns true
  // union(setA, setC); // returns Set {1, 2, 3, 4, 5, 6}
  // intersection(setA, setC); // returns Set {3, 4}
  // symmetricDifference(setA, setC); // returns Set {1, 2, 5, 6}
  // difference(setA, setC); // returns Set {1, 2}

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

    //filter through this new set and
  }

  function getAvailableOptions(schools) {
    const schoolItem = schools[0]?.properties;
    console.log(`schoolItem: `, schoolItem);

    const schoolProperties = Object.keys(schoolItem);
    console.log(`schoolProperties: `, schoolProperties);

    const nextAvailableOptions = {};
    schoolProperties.map((propertyName) => {
      const optionsArray = optionsArrayFromProperty(schools, propertyName);
      console.log(`optionsArray from ${propertyName}: `, optionsArray);
      nextAvailableOptions[propertyName] = optionsArray;
      console.log(`nextAvailableOptions in .map: `, nextAvailableOptions);
      return optionsArray;
    });
    console.log(`nextAvailableOptions after .map: `, nextAvailableOptions);

    return nextAvailableOptions;
  }

  function selectedSetFromOptions(totalSet, selectedOptions) {
    const filteredSet = new Set();
    const newSet = [...totalSet];
    let setArray = [];
    console.log(`setArray before loop: `, setArray);
    // console.log(`totalSet: `, totalSet);
    // console.log(`newSet: `, newSet);
    // console.log(`filteredSet: `, filteredSet);
    for (const property in selectedOptions) {
      console.log(`selectedSetFromOptions!!!`);
      console.log(`${property}: ${selectedOptions[property]}`);
      //take all schools
      //and for each property - i.e. CITY
      //check each school
      //if the selected value of the property i.e. Gresham for CITY
      //is equal to the value of the property for a specific school
      //i.e. FID 5 Mt.Hood CC
      //add to filteredSet

      // totalSet.map((item) => {
      //   if (item.properties[property] === selectedOptions[property]) {
      //     console.log(`success!!!`);
      //     filteredSet.add(item);
      //   }
      // });
      const selectedSet = totalSet.filter(
        (item) => item.properties[property] === selectedOptions[property]
      );
      setArray.push(selectedSet);
    }
    //console.log(`filteredSet after for ... in loop: `, filteredSet);
    console.log(`setArray after loop: `, setArray);
    const setObject = { ...setArray };
    console.log(setObject);
  }

  const value = {
    initialSchools,
    schools,
    setSchools,
    availableOptions,
    selectedOptions,
    setSelectedOptions,
    selectedSetFromOptions,
    getSchools,
    getAvailableOptions,
  };

  return (
    <SchoolsContext.Provider value={value}>{children}</SchoolsContext.Provider>
  );
}

export default SchoolsProvider;
