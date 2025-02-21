import express from "express";
import documentRoute from "./routes/documentRoutes";
const app = express();
app.use(express.json());
app.use("/api", documentRoute);
const PORT: number = 3000;

app.listen(PORT, () => {
  console.log("first");
});
