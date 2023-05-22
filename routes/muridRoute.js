import express from "express";
import { apiFilterMuridByNama, 
        // apiFilterMuridByCabang, 
        // apiFilterMuridByTanggal, 
        apiFilterMuridByRangeTanggal,
        apiGetAllMurid,
        apiGetMuridById,
        apiCreateMurid,
        apiUpdateMurid,
        apiDeleteMurid } from "../controllers/muridController.js";

const router = express.Router();

router.get("/filter-by-nama", apiFilterMuridByNama);
// router.get("/filter-by-cabang", apiFilterMuridByCabang);
// router.get("/filter-by-tanggal", apiFilterMuridByTanggal);
router.get("/filter-by-range-tanggal", apiFilterMuridByRangeTanggal);
router.get("", apiGetAllMurid);
router.get("/:id", apiGetMuridById);
router.post("/create", apiCreateMurid);
router.put("/:id", apiUpdateMurid);
router.delete("/:id", apiDeleteMurid);

const muridRoute = router;
export default muridRoute;
