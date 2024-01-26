import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import userRoutes from "./routes/UserRoutes.js";
import quizRoutes from "./routes/QuizRoutes.js";

import mongoose from "mongoose";

configDotenv();
const app = express();
const port = process.env.PORT || 5000;
const connection_url = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(connection_url);
    console.log("connection established");
  } catch (err) {
    console.error("error connecting");
  }
};
connectDB();

app.use(express.json(), cors());

app.use("/user", userRoutes);
app.use("/quiz", quizRoutes);

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
