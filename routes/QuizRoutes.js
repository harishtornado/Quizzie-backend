import express from "express";
import {
  fetchQuiz,
  createQuiz,
  getQuiz,
  deleteQuiz,
  updateQuiz,
} from "../controllers/QuizController.js";

const router = express.Router();

router.get("/fetchQuiz/:id", fetchQuiz);
router.post("/createQuiz", createQuiz);
router.get("/getQuiz/:id", getQuiz);
router.delete("/deleteQuiz/:id", deleteQuiz);
router.put("/updateQuiz", updateQuiz);

export default router;
