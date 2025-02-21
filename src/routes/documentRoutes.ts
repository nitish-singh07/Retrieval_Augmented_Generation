import express from "express";
import { handleFileUpload } from "../controllers/handleUpload";
import { upload } from "../utils/upload";

const router = express.Router();

router.post("/upload", upload.single("file"), handleFileUpload);

export default router;
