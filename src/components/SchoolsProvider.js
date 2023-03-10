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
    const testSet = new Set();
    console.log(`testSet: `, testSet);
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
      // const filteredSet = totalSet.filter(
      //   (item) => item.properties[property] === selectedOptions[property]
      // );
      totalSet.map((item) => {
        if (item.properties[property] === selectedOptions[property]) {
          console.log(`success!!!`);
          testSet.add(item);
        }
      });
      // console.log(`filteredSet: `, filteredSet);
      // console.log(`adding filteredSet ot testSet`);
      // testSet.add(filteredSet);
    }
    console.log(`testSet after for ... in loop: `, testSet);
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
