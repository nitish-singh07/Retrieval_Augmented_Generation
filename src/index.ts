import express from "express";
import documentRoute from "./routes/documentRoutes";
import { initializeWeaviateSchema } from "./utils/weaviate";
import { waitForWeaviate } from "./utils/checkWeaviate";

const app = express();
app.use(express.json());
app.use("/api", documentRoute);
const PORT: number = 3000;

// Initialize server with database checks
const startServer = async () => {
  try {
    // Wait for Weaviate to be ready
    await waitForWeaviate();

    // Initialize schema
    await initializeWeaviateSchema();

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize:", error);
    process.exit(1);
  }
};

startServer();
