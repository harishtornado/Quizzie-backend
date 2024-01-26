import Quiz from "../models/QuizModal.js";
import mongoose from "mongoose";

export const fetchQuiz = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ObjectID" });
  }
  try {
    const quizzes = await Quiz.find({ createdBy: id });
    if (quizzes.length > 0) {
      res
        .status(200)
        .json({ message: "quiz fetched", data: quizzes, status: "ok" });
    } else {
      res
        .status(200)
        .json({ message: "no quizzes", data: null, status: "failed" });
    }
  } catch (err) {
    res
      .status(404)
      .json({ message: "error fetching quizzes", error: err.message });
  }
};

export const createQuiz = async (req, res) => {
  const quiz = await req.body;
  try {
    const newQuiz = new Quiz(quiz);
    await newQuiz.save();
    res.status(200).json({
      message: "quiz created statusfully",
      data: newQuiz,
      status: "ok",
    });
  } catch (err) {
    res
      .status(404)
      .json({ message: "error fetching quizzes", error: err.message });
  }
};

export const getQuiz = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ObjectID" });
  }
  try {
    const quiz = await Quiz.findById(id);
    if (quiz) {
      return res.status(200).json({
        message: "quiz found",
        data: quiz,
        status: "ok",
      });
    }
    res.status(200).json({
      message: "quiz not found",
      data: null,
      status: "failed",
    });
  } catch (err) {
    res
      .status(404)
      .json({ message: "error fetching quizzes", error: err.message });
  }
};

export const updateQuiz = async (req, res) => {
  const data = await req.body;
  try {
    const quiz = await Quiz.findByIdAndUpdate(data._id, data, { new: true });
    console.log(quiz);
    if (quiz) {
      return res.status(200).json({
        message: "quiz found",
        data: quiz,
        status: "ok",
      });
    }
    return res.status(200).json({
      message: "quiz not found",
      data: null,
      status: "failed",
    });
  } catch (err) {
    return res
      .status(404)
      .json({ message: "error fetching quizzes", error: err.message });
  }
};

export const deleteQuiz = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ObjectID" });
  }
  try {
    const quiz = await Quiz.findByIdAndDelete(id);
    if (quiz) {
      return res
        .status(200)
        .json({ message: "delete successfully", data: quiz, status: "ok" });
    }
    return res
      .status(200)
      .json({ message: "quiz not found", data: null, status: "failed" });
  } catch (err) {
    res
      .status(404)
      .json({ message: "error fetching quizzes", error: err.message });
  }
};
