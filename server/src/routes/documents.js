import { Router } from "express";
import axios from "axios";
import { upload } from "../middleware/upload.js";
import config from "../config/index.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const response = await axios.get(`${config.aiServiceUrl}/documents`);
    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener documentos" });
  }
});

router.post("/upload", upload.array("files", 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No se enviaron archivos" });
    }

    const formData = new FormData();
    for (const file of req.files) {
      const blob = new Blob([require("fs").readFileSync(file.path)]);
      formData.append("files", blob, file.originalname);
    }

    const response = await axios.post(
      `${config.aiServiceUrl}/ingest`,
      formData,
      { headers: formData.getHeaders(), timeout: 300000 }
    );

    return res.json(response.data);
  } catch (error) {
    console.error("Upload error:", error.message);
    return res.status(500).json({ error: "Error al procesar documentos" });
  }
});

router.delete("/:filename", async (req, res) => {
  try {
    const response = await axios.delete(
      `${config.aiServiceUrl}/documents/${req.params.filename}`
    );
    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar documento" });
  }
});

router.post("/rescan", async (_req, res) => {
  try {
    const response = await axios.post(`${config.aiServiceUrl}/ingest-local`);
    return res.json(response.data);
  } catch (error) {
    console.error("Rescan error:", error.message);
    return res.status(500).json({ error: "Error al re-escanear carpeta" });
  }
});

export default router;
