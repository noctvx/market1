import express from "express";
import upload from "../middlewares/upload.js";
import { getAllItems, getItemById, createItem, updateItem, deleteItem } from "../controllers/itemsController.js";

const router = express.Router();

router.get("/", getAllItems);
router.get("/:id", getItemById);
router.post("/", upload.single("image"), createItem);
router.put("/:id", upload.single("image"), updateItem);
router.delete("/:id", deleteItem);

export default router;
