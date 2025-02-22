import express from "express";
import { handleFileUpload } from "../controllers/handleUpload";
import { queryDocument } from "../controllers/queryDocument";
import { upload } from "../utils/upload";

const router = express.Router();

router.post("/upload", upload.single("file"), handleFileUpload);
router.post("/query", queryDocument);

export default router;
