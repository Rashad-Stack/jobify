import dotenv from "dotenv";
import "express-async-errors";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();

const DB = process.env.MONGODB_DATABASE_URL!.replace(
  "<password>",
  process.env.MONGODB_DATABASE_PASSWORD!
);

mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful!"))
  .catch((error) => console.error("DB connection error:", error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running ${process.env.NODE_ENV} server`);
  console.log(`Server is running on port ${PORT}`);
});
