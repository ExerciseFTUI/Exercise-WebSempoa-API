import express from "express";
import {
  CheckToken,
  Login,
  Logout,
  Register,
  getAllAdmin,
} from "../controllers/adminController.js";
import { verifyRole, verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);
router.get("/token", CheckToken);
router.get(
  "/getAllAdmin",
  verifyToken,
  verifyRole(["IBO", "ADMIN_IBO"]),
  getAllAdmin
);
router.post("/logout", Logout);

const AdminRoute = router;
export default AdminRoute;
