function handleRadioChange(event, initialData, setData, property, setProperty) {
  const newValue = event.target.value;
  const newData = [...initialData];
  const newSet = newData.filter(
    (feature) => feature.properties[property] === newValue
  );
  setData(newSet);
  setProperty(newValue);
}

function RadioGroup({ state, setState, options }) {
  return (
    <fieldset>
      <legend>Select County</legend>
      {options.map((option) => (
        <div key={option}>
          <input
            type="radio"
            name="current-county"
            id={option}
            value={option}
            checked={option === state}
            onChange={
              (event) => console.log(event)
              // handleRadioChange(
              //   event,
              //   initialSchools,
              //   setSchools,
              //   "COUNTY",
              //   setValue
              // )
            }
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </fieldset>
  );
}

export default RadioGroup;
