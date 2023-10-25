import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import * as path from "path";
import errorHandlerMiddleWare from "./middleware/error-handler";
import notFoundMiddleware from "./middleware/not-found";
import authRoute from "./routes/authRoute";
import jobRoute from "./routes/jobRoute";

// initializing app
const app = express();
app.set("trust proxy", 1);

// Limit request from same api
const limit = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP. please try again in an hour!",
});

// middleware

app.use(cors());
app.use(express.json());
// Security middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(hpp());
app.use(limit);

// logger
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const dirname = path.dirname(process.argv[1]);
// only when ready to deploy
app.use(express.static(path.resolve(dirname, "./client/build", "index.html")));

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/jobs", jobRoute);

// Unhandled error and Routes
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleWare);

export default app;
