import express from "express";
import {
  authCheck,
  login,
  logout,
  signup,
} from "../controllers/user.controller.js";
import { authentication } from "../middleware/authentication.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/authcheck", authentication, authCheck);

export default router;
