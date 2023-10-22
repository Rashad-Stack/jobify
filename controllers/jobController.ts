import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Job from "../models/job";
import AppError from "../utils/appError";

export const createJob = async (req: Request, res: Response) => {
  const { position, company } = req.body;

  if (!position || !company) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "Please provide all values!",
    });
    throw new AppError("Please provide all values!", StatusCodes.BAD_REQUEST);
  }
  req.body.createdBy = (req as any).user._id;

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json(job);
};
export const getAllJobs = (req: Request, res: Response) => {
  res.send("Get all Jobs");
};
export const updateJob = (req: Request, res: Response) => {
  res.send("Update Job");
};
export const deleteJob = (req: Request, res: Response) => {
  res.send("Delete Job");
};
export const showStats = (req: Request, res: Response) => {
  res.send("Show stats");
};
