import express from "express";
import documentRoutes from "./routes/documentRoutes";
import { logger } from "./utils/logger";

const app = express();
app.use(express.json());

// Routes
app.use("/api", documentRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
