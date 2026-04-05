import express from "express";
import multer from "multer";
import Detection from "../models/Detection.js";
import { detectConstellationFromImage } from "../constellationEngine.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files allowed"));
  },
});

router.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    const result = await detectConstellationFromImage(req.file.buffer);

    if (!result.matched) {
      return res.json({ matched: false, reason: result.reason });
    }

    await Detection.create({
      constellationName: result.name,
      confidence: result.confidence,
      starsDetected: result.starsDetected,
      detectedAt: new Date(),
    });

    res.json(result);
  } catch (err) {
    console.error("Detection error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const docs = await Detection.find().sort({ detectedAt: -1 }).limit(50);
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
