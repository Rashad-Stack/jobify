interface FormRowProps {
  name: string;
  labelText?: string;
  type: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function FormRow({
  name,
  labelText,
  type,
  value,
  handleChange,
}: FormRowProps) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
}
