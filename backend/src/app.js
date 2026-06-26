import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import itemsRoutes from "./routes/items.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/api/items", itemsRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "frontend", "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Erro interno no servidor" });
});

export default app;
