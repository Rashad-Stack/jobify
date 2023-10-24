import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import moment from "moment";
import mongoose from "mongoose";
import Job from "../models/job";
import AppError from "../utils/appError";

type IStats = {
  pending: number;
  interview: number;
  declined: number;
};

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
  const userId = (req as any).user._id;
  const queries = { ...req.query };
  // Deleting excludeField match items from queries
  const excludeFields = ["page", "sort", "limit", "search"];
  excludeFields.forEach((item) => delete queries[item]);
  // if query value is null then remove from queries
  Object.keys(queries).forEach((item) => {
    if (queries[item] === "all" || !queries[item]) delete queries[item];
  });

  console.log(queries);

  let result = Job.find({ createdBy: userId, ...queries });

  // search
  if (req.query.search && req.query.search !== "null") {
    result = result.find({
      $or: [
        { position: { $regex: req.query.search, $options: "i" } },
        { company: { $regex: req.query.search, $options: "i" } },
      ],
    });
  }

  // sorting base on A-Z, Z-A, Latest, Oldest
  if (req.query.sort || req.query.sort === "null") {
    let sort = req.query.sort as string;
    if (sort === "latest") {
      result = result.sort("-createdAt");
    }
    if (sort === "oldest") {
      result = result.sort("createdAt");
    }
    if (sort === "a-z") {
      result = result.sort("position");
    }
    if (sort === "z-a") {
      result = result.sort("-position");
    }
  }

  const jobs = await result;

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
export const showStats = async (req: Request, res: Response) => {
  const stats = await Job.aggregate([
    {
      $match: { createdBy: new mongoose.Types.ObjectId((req as any).user._id) },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const formateStats: IStats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {} as Record<string, number>);

  const defaultStats = {
    pending: formateStats.pending || 0,
    interview: formateStats.interview || 0,
    declined: formateStats.declined || 0,
  };

  const applicationsAggregate = await Job.aggregate([
    {
      $match: { createdBy: new mongoose.Types.ObjectId((req as any).user._id) },
    },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        "_id.year": -1,
        "_id.month": -1,
      },
    },
    {
      $limit: 6,
    },
  ]);

  const weeklyApplications = applicationsAggregate
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM y");

      return {
        date,
        count,
      };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, weeklyApplications });
};
