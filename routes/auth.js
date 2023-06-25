import { Router } from "express";
import { login, logout, refresh, register } from "../controller/auth.js";
import verifyRefreshToken from "../middleware/verifyToken.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", verifyRefreshToken, refresh);

export default router;
