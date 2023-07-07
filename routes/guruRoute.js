import express from "express";
import {
  addGuru,
  getAllGuru,
  getGuruByCabang,
  getGuruById,
} from "../controllers/guruController.js";

const router = express.Router();

router.get("/", getAllGuru);
router.post("/addGuru", addGuru);
router.get("/:id", getGuruById);
router.get("/cabang/:cabangId", getGuruByCabang);

const guruRoute = router;
export default guruRoute;
