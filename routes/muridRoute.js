import express from "express";
import {
  apiFilterMuridByNama,
  // apiFilterMuridByCabang,
  // apiFilterMuridByTanggal,
  apiFilterMuridByRangeTanggal,
  apiGetAllMurid,
  apiGetMuridById,
  apiCreateMurid,
  apiUpdateMurid,
  apiDeleteMurid,
  // apiChangeMuridCabang,
  apiCreateNewInvoice,
  apiFilterMuridByMonthYear,
  apiFilterMuridInvoice,
  apiGeneratePdf,
} from "../controllers/muridController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/filter-by-nama", apiFilterMuridByNama);
// router.get("/filter-by-cabang", apiFilterMuridByCabang);
// router.get("/filter-by-tanggal", apiFilterMuridByTanggal);
router.get("/filter-by-range-tanggal", apiFilterMuridByRangeTanggal);
router.get("", apiGetAllMurid);
router.get("/getMuridById/:id", apiGetMuridById);
router.post("/create", apiCreateMurid);
router.put("/:id", apiUpdateMurid);
router.delete("/:id", apiDeleteMurid);
// router.post("/cabang", apiChangeMuridCabang);
router.put("/invoice/:id", apiCreateNewInvoice);
router.post("/filter-by-month-year", apiFilterMuridByMonthYear);
router.post("/filter-by-invoice", apiFilterMuridInvoice);
router.get("/generateInvoice", apiGeneratePdf);

const muridRoute = router;
export default muridRoute;
