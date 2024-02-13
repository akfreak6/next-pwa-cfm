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
      <select id={label} value={selectedValues} onChange={(e) => onValuesChange([e.target.value])}>
        <option key="" value="">-- Select --</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MultiSelectDropdown;
