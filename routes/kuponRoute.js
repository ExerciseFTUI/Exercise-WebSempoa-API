import express from "express";
import {
  addKupon,
  getAllKupon,
  getKuponByCabang,
  rekapKupon,
  useKupon,
} from "../controllers/KuponController.js";
const router = express.Router();

router.get("/", getAllKupon);
router.get("/getKuponByCabang/:cabangId", getKuponByCabang);
router.post("/addKupon", addKupon);
router.get("/useKupon/:kuponId", useKupon);
router.get("/rekapKupon", rekapKupon);

const KuponRoute = router;
export default KuponRoute;
