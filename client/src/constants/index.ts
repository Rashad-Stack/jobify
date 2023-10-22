import { FaChartBar, FaChartLine, FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
export const links = [
  {
    id: 1,
    text: "Stats",
    path: "/",
    icon: FaChartBar,
  },
  {
    id: 2,
    text: "all jobs",
    path: "all-jobs",
    icon: FaChartLine,
  },
  {
    id: 3,
    text: "add job",
    path: "add-job",
    icon: FaWpforms,
  },
  {
    id: 4,
    text: "profile",
    path: "profile",
    icon: ImProfile,
  },
];

export const jobTypes = ["full-time", "part-time", "remote", "internship"];
export const jobStatus = ["interview", "declined", "pending"];
