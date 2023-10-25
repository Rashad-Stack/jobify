import bcrypt from "bcryptjs";
import { Response } from "express";
import jwt from "jsonwebtoken";
import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";

interface UserTypes extends Document {
  name: string;
  email: string;
  password: string;
  lastName: string;
  location: string;
  createAuthToken(): string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  sendCookie(res: Response, token: string): void;
}

const userSchema: Schema<UserTypes> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "Please provide a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 6,
    select: false,
  },
  lastName: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "last_name",
  },
  location: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "my city",
  },
});

userSchema.pre("save", function () {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

userSchema.methods.createAuthToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN!,
  });
};

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.sendCookie = function (res: Response, token: string) {
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    secure: process.env.NODE_ENV === "production",
  });
};

const User = mongoose.model<UserTypes>("User", userSchema);

export default User;
