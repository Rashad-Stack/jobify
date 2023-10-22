interface AlertProps {
  message?: string;
  type?: string;
}
export default function Alert({
  message = "Please provide all values!",
  type = "error",
}: AlertProps) {
  return type === "error" ? (
    <div className="alert alert-danger">{message}</div>
  ) : (
    <div className="alert alert-success">{message}</div>
  );
}
