import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: [true, "Please provide a position"],
      maxLength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },

    jobType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship"],
      default: "full-time",
    },

    company: {
      type: String,
      required: [true, "Please provide a company name"],
      maxLength: 20,
    },
    location: {
      type: String,
      required: [true, "Please provide a location"],
      default: "my city",
      maxLength: 100,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
