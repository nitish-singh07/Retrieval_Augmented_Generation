import express from "express";
import { DocumentController } from "../controllers/DocumentController";
import multer from "multer";

const upload = multer();
const router = express.Router();
const documentController = new DocumentController();

// Upload document
router.post(
  "/upload",
  upload.single("file"),
  documentController.uploadDocument
);

// Query documents
router.post("/query", documentController.queryDocuments);

export default router;
