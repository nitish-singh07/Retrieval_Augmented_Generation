import { weaviateClient } from "./weaviate";

export const waitForWeaviate = async (
  retries = 5,
  delay = 2000
): Promise<boolean> => {
  for (let i = 0; i < retries; i++) {
    try {
      await weaviateClient.misc.liveChecker().do();
      console.log("Successfully connected to Weaviate");
      return true;
    } catch (error) {
      console.log(
        `Attempt ${
          i + 1
        }/${retries}: Weaviate not ready yet. Retrying in ${delay}ms...`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error("Failed to connect to Weaviate after multiple attempts");
};
