import React from "react";
import schoolsData from "./../data/schools.json";

export const SchoolsContext = React.createContext();

function SchoolsProvider({ children }) {
  const initialSchools = schoolsData?.features;
  const [schools, setSchools] = React.useState(initialSchools);

  const value = { schools, setSchools };

  return (
    <SchoolsContext.Provider value={value}>{children}</SchoolsContext.Provider>
  );
}

export default SchoolsProvider;
