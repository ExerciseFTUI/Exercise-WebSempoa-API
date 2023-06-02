import express from "express";
import { createCabang, getAllCabang } from "../controllers/cabangController.js";
import { verifyRole, verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getAllCabang", verifyToken, verifyRole("IBO"), getAllCabang);
router.post("/createCabang", createCabang);

const CabangRoute = router;
export default CabangRoute;
