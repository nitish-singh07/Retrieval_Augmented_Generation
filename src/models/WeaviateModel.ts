import weaviate from "weaviate-ts-client";

const client = weaviate.client({
  scheme: "http",
  host: "localhost:8080",
});

export class WeaviateModel {
  // Store document and embedding in Weaviate
  async storeDocument(text: string, embedding: number[]): Promise<void> {
    await client.data
      .creator()
      .withClassName("Document")
      .withProperties({ text, embedding })
      .do();
  }

  // Retrieve relevant documents based on query embedding
  async queryDocuments(queryEmbedding: number[]): Promise<any[]> {
    const result = await client.graphql
      .get()
      .withClassName("Document")
      .withFields("text")
      .withNearVector({ vector: queryEmbedding, certainty: 0.7 })
      .do();
    return result.data.Get.Document;
  }
}
