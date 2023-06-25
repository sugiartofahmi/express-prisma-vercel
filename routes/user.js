import { Router } from "express";
import { getDataUser } from "../controller/user.js";
import auth from "../middleware/auth.js";
const router = Router();

router.get("/", auth, getDataUser);

export default router;
