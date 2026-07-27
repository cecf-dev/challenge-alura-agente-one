import dotenv from "dotenv";
dotenv.config();

export default {
  port: parseInt(process.env.PORT, 10) || 3001,
  nodeEnv: process.env.NODE_ENV || "development",
  aiServiceUrl: process.env.AI_SERVICE_URL || "http://localhost:8000",
  uploadDir: "uploads",
  maxFileSizeMB: parseInt(process.env.MAX_FILE_SIZE_MB, 10) || 50,
};
