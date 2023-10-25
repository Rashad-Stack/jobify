import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user";
import AppError from "../utils/appError";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "Please provide all values!",
    });
    return next(
      new AppError("Please provide all values!", StatusCodes.BAD_REQUEST)
    );
  }

  // Creating  new user
  const user = await User.create({ name, email, password });
  const token = user.createAuthToken();
  user.sendCookie(res, token);
  res.status(StatusCodes.CREATED).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
    },
    location: user.location,
  });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "Please provide all values!",
    });
    return next(
      new AppError("Please provide all values!", StatusCodes.BAD_REQUEST)
    );
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: "error",
      message: "User not found!",
    });
    return next(new AppError("User not found!", StatusCodes.NOT_FOUND));
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      status: "error",
      message: "Invalid email or password!",
    });
    return next(
      new AppError("Invalid email or password!", StatusCodes.BAD_REQUEST)
    );
  }

  const token = user.createAuthToken();
  user.sendCookie(res, token);
  res.status(StatusCodes.OK).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
    },
    location: user.location,
  });
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, name, lastName, location } = req.body;

  // Fields checking
  if (!email || !name || !lastName || !location) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "Please provide all values!",
    });
    return next(
      new AppError("Please provide all values!", StatusCodes.BAD_REQUEST)
    );
  }

  try {
    // Checking if user exists
    const user = await User.findByIdAndUpdate(
      (req as any).user._id,
      {
        $set: {
          email: email,
          name: name,
          lastName: lastName,
          location: location,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: "User not found!",
      });
      return next(new AppError("User not found!", StatusCodes.NOT_FOUND));
    }

    const token = user.createAuthToken();
    user.sendCookie(res, token);
    res.status(StatusCodes.OK).json({
      status: "success",
      message: "User updated successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          lastName: user.lastName,
          location: user.location,
        },
        location: user.location,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "Error",
      message: "Unable to update user!",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({
    status: "success",
  });
};

export const authenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return next(
      new AppError("Invalid Authentication", StatusCodes.UNAUTHORIZED)
    );
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    (req as any).user = { _id: payload.id };
    next();
  } catch (error) {
    return next(
      new AppError("Invalid Authentication", StatusCodes.UNAUTHORIZED)
    );
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById((req as any).user._id);

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: "error",
      message: "User not found!",
    });
    return next(new AppError("User not found!", StatusCodes.NOT_FOUND));
  }

  res.status(StatusCodes.OK).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
    },
    location: user.location,
  });
};
