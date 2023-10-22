type FormRowSelectProps = {
  name: string;
  labelText?: string;
  value: string;
  options: string[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultValue?: string;
};
export default function FormRowSelect({
  name,
  labelText,
  value,
  handleChange,
  options,
  defaultValue,
}: FormRowSelectProps) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        defaultValue={defaultValue}
        className="form-select"
        id={name}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
