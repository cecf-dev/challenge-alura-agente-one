import { Router } from "express";
import axios from "axios";
import config from "../config/index.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "message es requerido" });
    }

    const aiResponse = await axios.post(`${config.aiServiceUrl}/query`, {
      question: message,
      session_id: sessionId || "default",
    });

    return res.json({
      answer: aiResponse.data.answer,
      sources: aiResponse.data.sources || [],
      sessionId: sessionId || "default",
    });
  } catch (error) {
    console.error("Chat error:", error.message);
    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data });
    }
    return res.status(500).json({ error: "Error al conectar con el servicio de IA" });
  }
});

export default router;
