import express from "express";
import {
  createBarang,
  getAllBarangs,
  getBarangById,
  updateBarangById,
  deleteBarangById,
  getFilteredBarangs,
} from "../controllers/barangsController";
import { verifyRole, verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/createBarang", createBarang);
router.get("/getAllBarang", getAllBarangs);
router.get("/getBarangById", getBarangById);
router.delete("/deleteBarangById", deleteBarangById);
router.get("/filter", getFilteredBarangs);

export default router;
