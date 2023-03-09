import React from "react";
import schoolsData from "./../data/schools.json";

export const SchoolsContext = React.createContext();

function SchoolsProvider({ children }) {
  const initialSchools = schoolsData?.features;
  const [schools, setSchools] = React.useState(initialSchools);

  const countyArray = arrayFromSet(initialSchools, "COUNTY");
  const typeArray = arrayFromSet(initialSchools, "TYPE");
  const gradeArray = arrayFromSet(initialSchools, "GRADE");
  const districtArray = arrayFromSet(initialSchools, "DISTRICT");
  const levelNameArray = arrayFromSet(initialSchools, "LEVEL_NAME");
  const zipCodeArray = arrayFromSet(initialSchools, "ZIPCODE");
  const cityArray = arrayFromSet(initialSchools, "CITY");

  const filterOptions = {
    counties: countyArray,
    types: typeArray,
    grades: gradeArray,
    districts: districtArray,
    levelNames: levelNameArray,
    zipCodes: zipCodeArray,
    cities: cityArray,
  };

  const initialOptions = {
    county: "",
    type: "",
    grade: "",
    district: "",
    levelName: "",
    zipCode: "",
    city: "",
  };

  const [selectedOptions, setSelectedOptions] = React.useState(initialOptions);

  // Examples
  // const setA = new Set([1, 2, 3, 4]);
  // const setB = new Set([2, 3]);
  // const setC = new Set([3, 4, 5, 6]);

  // isSuperset(setA, setB); // returns true
  // union(setA, setC); // returns Set {1, 2, 3, 4, 5, 6}
  // intersection(setA, setC); // returns Set {3, 4}
  // symmetricDifference(setA, setC); // returns Set {1, 2, 5, 6}
  // difference(setA, setC); // returns Set {1, 2}

  function arrayFromSet(data, propertyName) {
    const dataSet = new Set(data.map((item) => item.properties[propertyName]));
    dataSet.delete(null);
    const uniqueArray = [...dataSet];
    const sortedArray = uniqueArray.sort();
    return sortedArray;
  }

  function selectedSetFromOptions(totalSet, selectedOptions) {
    for (const property in selectedOptions) {
      console.log(`${property}: ${selectedOptions[property]}`);

      // const filteredSet = totalSet.filter(
      //   (item) => item[property] === selectedOptions[property]
      // );
      // console.log(filteredSet);
    }
  }

  const value = {
    initialSchools,
    schools,
    setSchools,
    filterOptions,
    selectedOptions,
    setSelectedOptions,
    selectedSetFromOptions,
  };

  return (
    <SchoolsContext.Provider value={value}>{children}</SchoolsContext.Provider>
  );
}

export default SchoolsProvider;
