import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import uploadRoutes from "./routes/upload.js";
import authRoutes from "./routes/auth.js";
import transcriptRoutes from "./routes/transcripts.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// API routes
app.use("/api", uploadRoutes);
app.use("/api", authRoutes);
app.use("/api", transcriptRoutes);

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () =>
  console.log("✅ Connected to MongoDB")
);
mongoose.connection.on("error", (err) =>
  console.error("❌ MongoDB connection error:", err)
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
