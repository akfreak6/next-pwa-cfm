interface MultiSelectDropdownProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onValuesChange: (values: string[]) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ label, options, selectedValues, onValuesChange }) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <select style={{color:'#000'}} id={label} value={selectedValues} onChange={(e) => onValuesChange([e.target.value])}>
        <option style={{ color: '#000'}} key="" value="">-- Select --</option>
        {options.map((option) => (
          <option style={{ color: '#000'}} key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MultiSelectDropdown;
