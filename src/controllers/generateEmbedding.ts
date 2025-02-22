let embeddingPipeline: any = null;

async function initializeEmbeddingPipeline() {
  if (!embeddingPipeline) {
    const { pipeline } = await import("@xenova/transformers");
    embeddingPipeline = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }
  return embeddingPipeline;
}

export const generateEmbeddings = async (
  texts: string[]
): Promise<number[][]> => {
  try {
    const pipeline = await initializeEmbeddingPipeline();
    const embeddings: number[][] = [];

    // Process texts in batches
    for (const text of texts) {
      const output = await pipeline(text, {
        pooling: "mean",
        normalize: true,
      });

      // Convert TypedArray to regular array
      embeddings.push(Array.from(output.data));
    }

    return embeddings;
  } catch (error: any) {
    throw new Error(`Failed to generate embeddings: ${error.message}`);
  }
};
