import express from "express";
import {
  createCabang,
  getAllCabang,
  rekapMuridCabang,
} from "../controllers/cabangController.js";
import { verifyRole, verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// router.get("/getAllCabang", verifyToken, verifyRole("IBO"), getAllCabang);
router.get("/getAllCabang", getAllCabang);
router.post("/createCabang", createCabang);
router.get("/rekapStatusSiswa", rekapMuridCabang);

const CabangRoute = router;
export default CabangRoute;
