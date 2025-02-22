import weaviate, { WeaviateClient } from "weaviate-ts-client";
import dotenv from "dotenv";

dotenv.config();

export const weaviateClient: WeaviateClient = weaviate.client({
  scheme: process.env.WEAVIATE_SCHEME || "http",
  host: process.env.WEAVIATE_HOST || "localhost:8080",
});

// Initialize schema if it doesn't exist
export const initializeWeaviateSchema = async () => {
  const schemaConfig = {
    class: "Document",
    properties: [
      {
        name: "content",
        dataType: ["text"],
      },
      {
        name: "documentId",
        dataType: ["string"],
      },
      {
        name: "chunkIndex",
        dataType: ["number"],
      },
    ],
    vectorizer: "none", // We'll provide vectors manually
  };

  try {
    await weaviateClient.schema.classCreator().withClass(schemaConfig).do();
  } catch (error) {
    // Class might already exist, which is fine
    console.log("Schema initialization completed");
  }
};
