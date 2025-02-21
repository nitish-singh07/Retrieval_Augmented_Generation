import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import { Request, Response } from "express";
import { splitTextIntoChunks } from "./chunk";
// import { generateEmbeddings } from "./genrateEmbedding";

export const handleFileUpload = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();

    let extractedText = "";

    if (ext === ".pdf") {
      const data = await pdfParse(fs.readFileSync(filePath));
      extractedText = data.text;
    } else if (ext === ".docx") {
      const data = await mammoth.extractRawText({ path: filePath });
      extractedText = data.value;
    } else if (ext === ".json" || ext === ".txt") {
      extractedText = fs.readFileSync(filePath, "utf-8");
    } else {
      fs.unlinkSync(filePath); // Delete unsupported files
      res.status(400).json({ error: "Unsupported file format" });
      return;
    }

    const chunks = await splitTextIntoChunks(extractedText, 500);

    // const embeddings = await generateEmbeddings(chunks);
    // console.log("Embeddings:", embeddings);

    fs.unlinkSync(filePath); // Delete file after processing
    res.json({ extractedText, chunks });
  } catch (error: any) {
    res.status(500).json({ error: `Error extracting text: ${error.message}` });
  }
};
