import express from "express";
import { getAllSample } from "../controllers/sampleController.js";

const router = express.Router();

router.get("/getAllSamples", getAllSample);

const sampleRoute = router;
export default sampleRoute;
