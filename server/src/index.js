import express from "express";
import cors from "cors";
import morgan from "morgan";
import config from "./config/index.js";
import chatRoutes from "./routes/chat.js";
import documentRoutes from "./routes/documents.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "MangaTech AI Server" });
});

app.use("/api/chat", chatRoutes);
app.use("/api/documents", documentRoutes);

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(config.port, () => {
  console.log(`MangaTech Server running on port ${config.port}`);
  console.log(`AI Service URL: ${config.aiServiceUrl}`);
});
