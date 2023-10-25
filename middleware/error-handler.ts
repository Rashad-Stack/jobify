import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import AppError from "../utils/appError";

const dbCastError = (err: mongoose.Error.CastError) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
};

const handleDuplicateFieldsDB = (err: mongoose.Error) => {
  const valueMatch = err.message.match(/(["'])(\\?.)*?\1/);
  const value = valueMatch ? valueMatch[0] : "";

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
};

const handleValidationErrorDB = (err: mongoose.Error.ValidationError) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", StatusCodes.UNAUTHORIZED);

const handleJWTExpiredError = () =>
  new AppError(
    "Your token has expired! Please log in again.",
    StatusCodes.UNAUTHORIZED
  );

const errorHandlerMiddleWare = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: any = { ...err };

  error.statuscode = err.statuscode || 500;
  error.status = err.status || "error";
  error.message = err.message || "Something went very wrong!";

  if (err.name === "CastError") error = dbCastError(err);
  if (err?.code === 11000) error = handleDuplicateFieldsDB(err);
  if (err?.errors?.options?.name === "ValidationError")
    error = handleValidationErrorDB(err);
  if (err?.name === "ValidationError") error = handleValidationErrorDB(err);
  if (err?.name === "JsonWebTokenError") error = handleJWTError();
  if (err?.name === "TokenExpiredError") error = handleJWTExpiredError();

  console.log({
    status: error.status,
    message: error.message,
    error,
    stack: err.stack,
  });

  res.status(error.statuscode).json({
    status: error.status,
    message: error.message,
  });
};

export default errorHandlerMiddleWare;
