import mongoose from "mongoose";

const detectionSchema = new mongoose.Schema({
  constellationName: { type: String, required: true },
  confidence: { type: Number, required: true },
  starsDetected: { type: Number, default: 0 },
  detectedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Detection", detectionSchema);
