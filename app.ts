import cors from "cors";
import express from "express";
import morgan from "morgan";
import errorHandlerMiddleWare from "./middleware/error-handler";
import notFoundMiddleware from "./middleware/not-found";
import authRoute from "./routes/authRoute";
import jobRoute from "./routes/jobRoute";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/jobs", jobRoute);

// Unhandled error and Routes
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleWare);

export default app;
