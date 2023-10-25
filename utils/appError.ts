class AppError extends Error {
  public statuscode: number;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, statuscode: number) {
    super(message);

    this.statuscode = statuscode;
    this.status = `${statuscode}`.startsWith("4") ? "failed" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
