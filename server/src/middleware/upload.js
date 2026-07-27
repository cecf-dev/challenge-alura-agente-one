import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";
import config from "../config/index.js";

const storage = multer.diskStorage({
  destination: config.uploadDir,
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuid()}${ext}`);
  },
});

const ALLOWED_EXTENSIONS = [
  ".pdf", ".docx", ".doc", ".xlsx", ".xls",
  ".csv", ".md", ".json", ".html", ".htm",
];

export const upload = multer({
  storage,
  limits: { fileSize: config.maxFileSizeMB * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ALLOWED_EXTENSIONS.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Formato no soportado: ${ext}`));
    }
  },
});
