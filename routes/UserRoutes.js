import {
  fetchUser,
  loginUser,
  newUser,
} from "../controllers/UserController.js";
import express from "express";

const router = express.Router();

router.get("/fetchUser", fetchUser);
router.post("/loginUser", loginUser);
router.post("/newUser", newUser);

export default router;
