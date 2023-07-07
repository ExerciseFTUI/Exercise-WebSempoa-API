import express from "express";
import { addKupon, getAllKupon } from "../controllers/KuponController.js";
const router = express.Router();

// router.get("/getAllCabang", verifyToken, verifyRole("IBO"), getAllCabang);
router.get("/", getAllKupon);
router.post("/addKupon", addKupon);

const KuponRoute = router;
export default KuponRoute;
