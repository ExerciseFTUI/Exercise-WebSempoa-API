import express from "express";
import {
  addKupon,
  getAllKupon,
  getKuponByCabang,
} from "../controllers/KuponController.js";
const router = express.Router();

router.get("/", getAllKupon);
router.get("/getKuponByCabang/:cabangId", getKuponByCabang);
router.post("/addKupon", addKupon);

const KuponRoute = router;
export default KuponRoute;
