import { Request, Response } from "express";

export const createJob = (req: Request, res: Response) => {
  res.send("Create Job");
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
