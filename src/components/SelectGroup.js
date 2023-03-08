function SelectGroup({ valuesArray }) {
  return (
    <div>
      <label htmlFor="district-select">Select a district</label>
      <select
        id={`district - select`}
        value={"district"}
        onChange={() => console.log(`select district`)}
      >
        <option value="">--Select a District--</option>
        <optgroup label="districts">
          {valuesArray.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </optgroup>
      </select>
    </div>
  );
}

export default SelectGroup;
