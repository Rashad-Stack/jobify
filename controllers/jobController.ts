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
export const getAllJobs = async (req: Request, res: Response) => {
  const jobs = await Job.find({ createdBy: (req as any).user._id }).sort({
    createdAt: -1,
  });
  res.status(StatusCodes.OK).json({ jobs, totalJobs: jobs.length, page: 1 });
};

export const getJob = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);
  const job = await Job.findOne({
    _id: id,
    createdBy: (req as any).user._id,
  });

  if (!job) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: "error",
      message: "Job not found!",
    });
    throw new AppError("Job not found!", StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json(job);
};

export const updateJob = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "Please provide an ID",
    });
    throw new AppError("Please provide an ID!", StatusCodes.BAD_REQUEST);
  }

  const { position, company } = req.body;
  if (!position || !company) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "Please provide all values!",
    });
    throw new AppError("Please provide all values!", StatusCodes.BAD_REQUEST);
  }

  // Check if user Authorize to edited the job
  const authorizeJob = await Job.findOne({
    _id: id,
    createdBy: (req as any).user._id,
  });
  if (!authorizeJob) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      status: "error",
      message: "you are not authorized or Job no longer exists!",
    });
    throw new AppError(
      "you are not authorized or Job no longer exists!",
      StatusCodes.UNAUTHORIZED
    );
  }

  const job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!job) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: "error",
      message: "Job no longer exists!",
    });
    throw new AppError("Job no longer exists!", StatusCodes.NOT_FOUND);
  }

  console.log(job);

  res.status(StatusCodes.OK).json(job);
};
export const deleteJob = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "Please provide an ID",
    });
    throw new AppError("Please provide an ID!", StatusCodes.BAD_REQUEST);
  }

  // Check if user Authorize to edited the job
  const authorizeJob = await Job.findOne({
    _id: id,
    createdBy: (req as any).user._id,
  });
  if (!authorizeJob) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      status: "error",
      message: "you are not authorized or Job no longer exists!",
    });
    throw new AppError(
      "you are not authorized or Job no longer exists!",
      StatusCodes.UNAUTHORIZED
    );
  }

  // Check if Job Exist
  const job = await Job.findByIdAndDelete(id);
  if (!job) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: "error",
      message: "Job no longer exists!",
    });
    throw new AppError("Job no longer exists!", StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Job deleted!",
  });
};
export const showStats = (req: Request, res: Response) => {
  res.send("Show stats");
};
