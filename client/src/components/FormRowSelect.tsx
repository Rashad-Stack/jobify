type FormRowSelectProps = {
  name: string;
  labelText?: string;
  value: string;
  disabled?: boolean;
  options: string[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
export default function FormRowSelect({
  name,
  labelText,
  value,
  disabled,
  handleChange,
  options,
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
        className="form-select"
        id={name}
        disabled={disabled}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
