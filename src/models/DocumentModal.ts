import { pipeline } from "@xenova/transformers";
import { PDFDocument } from "pdf-lib";
import mammoth from "mammoth";

export class DocumentModel {
  // Extract text from PDF
  async extractTextFromPdf(fileBuffer: Buffer): Promise<string> {
    const pdfDoc = await PDFDocument.load(fileBuffer);
    const pages = pdfDoc.getPages();
    let text = "";
    pages.forEach((page) => {
      text += page.getTextContent();
    });
    return text;
  }

  // Extract text from DOCX
  async extractTextFromDocx(fileBuffer: Buffer): Promise<string> {
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    return result.value;
  }

  // Generate embeddings using Hugging Face model
  async generateEmbedding(text: string): Promise<number[]> {
    const extractor = await pipeline(
      "feature-extraction",
      "Xenova/multi-qa-mpnet-base-dot-v1"
    );
    const output = await extractor(text, { pooling: "mean", normalize: true });
    return Array.from(output.data);
  }
}
