import { Request, Response } from "express";
import { DocumentModel } from "../models/DocumentModal";
import { WeaviateModel } from "../models/WeaviateModel";
import { ApiResponse } from "../views/ApiResponse";

const documentModel = new DocumentModel();
const weaviateModel = new WeaviateModel();

export class DocumentController {
  // Upload and process a document
  async uploadDocument(req: Request, res: Response) {
    try {
      const fileBuffer = req.file?.buffer;
      if (!fileBuffer) {
        return ApiResponse.error(res, 400, "No file uploaded");
      }

      let text: string;
      if (req.file?.mimetype === "application/pdf") {
        text = await documentModel.extractTextFromPdf(fileBuffer);
      } else if (
        req.file?.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        text = await documentModel.extractTextFromDocx(fileBuffer);
      } else {
        return ApiResponse.error(res, 400, "Unsupported file format");
      }

      const embedding = await documentModel.generateEmbedding(text);
      await weaviateModel.storeDocument(text, embedding);

      ApiResponse.success(
        res,
        201,
        "Document uploaded and processed successfully"
      );
    } catch (error) {
      ApiResponse.error(res, 500, "Internal server error");
    }
  }

  // Query documents
  async queryDocuments(req: Request, res: Response) {
    try {
      const query = req.body.query;
      if (!query) {
        return ApiResponse.error(res, 400, "Query is required");
      }

      const embedding = await documentModel.generateEmbedding(query);
      const results = await weaviateModel.queryDocuments(embedding);

      ApiResponse.success(res, 200, "Query successful", results);
    } catch (error) {
      ApiResponse.error(res, 500, "Internal server error");
    }
  }
}
