import express from "express";
import {
  addGuru,
  getAllGuru,
  getGuruById,
} from "../controllers/guruController.js";

const router = express.Router();

router.get("/getAllGuru", getAllGuru);
router.post("/addGuru", addGuru);
router.get("/getGuruById", getGuruById);

const guruRoute = router;
export default guruRoute;
