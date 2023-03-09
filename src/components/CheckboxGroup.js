function CheckboxGroup({ options }) {
  return (
    <fieldset>
      <legend>Select 'Name Here'</legend>
      {options.map((option) => (
        <div key={option}>
          <input
            type="checkbox"
            id={option}
            value={option}
            checked={true}
            onChange={() => console.log(`${option} changed`)}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </fieldset>
  );
}

export default CheckboxGroup;
