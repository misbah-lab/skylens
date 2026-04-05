import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import detectionsRouter from "./routes/detections.js";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("ERROR: MONGO_URI is not set in .env file!");
  process.exit(1);
}

app.use(cors({ origin: "http://localhost:8080" }));
app.use(express.json({ limit: "20mb" }));
app.use("/api/detections", detectionsRouter);
app.get("/health", (_req, res) => res.json({ status: "ok" }));

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
    app.listen(PORT, () => console.log("Server running on http://localhost:" + PORT));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
