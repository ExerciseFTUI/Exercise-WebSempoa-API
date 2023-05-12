import express from "express";
import { createCabang, getAllCabang } from "../controllers/cabangController.js";

const router = express.Router();

router.get("/getAllCabang", getAllCabang);
router.post("/createCabang", createCabang);

const CabangRoute = router;
export default CabangRoute;
