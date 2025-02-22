import { Request, Response } from "express";
import { weaviateClient } from "../utils/weaviate";
import { generateEmbeddings } from "./generateEmbedding";

export const queryDocument = async (req: Request, res: Response) => {
  try {
    const { query, documentId, limit = 3 } = req.body;

    if (!query || !documentId) {
      return res.status(400).json({
        error: "Query and documentId are required",
      });
    }

    // Generate embedding for the query
    const queryEmbedding = await generateEmbeddings([query]);

    // Search Weaviate for similar content
    const result = await weaviateClient.graphql
      .get()
      .withClassName("Document")
      .withFields("content documentId chunkIndex")
      .withNearVector({
        vector: queryEmbedding[0],
      })
      .withWhere({
        operator: "Equal",
        path: ["documentId"],
        valueString: documentId,
      })
      .withLimit(limit)
      .do();

    const matches = result.data.Get.Document;

    if (!matches.length) {
      return res.status(404).json({
        message: "No relevant content found for this query",
      });
    }

    res.json({
      matches: matches.map((match: any) => ({
        snippet: match.content,
        documentId: match.documentId,
        chunkIndex: match.chunkIndex,
      })),
    });
  } catch (error: any) {
    res.status(500).json({
      error: `Error processing query: ${error.message}`,
    });
  }
};
