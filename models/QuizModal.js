import { Schema, model } from "mongoose";

const OptionSchema = new Schema({
  text: String,
  url: String,
  chosen: {
    type: Number,
    default: 0,
  },
});

const QuestionSchema = new Schema({
  question: String,
  impressions: {
    type: Number,
    default: 0,
  },
  optionType: {
    type: String,
    default: "text",
  },
  options: [OptionSchema],
  timer: {
    type: Number,
    default: 0,
  },
  correctAnswers: {
    type: Number,
    default: 0,
  },
  correctOption: Number,
});

const QuizSchema = new Schema({
  quizName: String,
  quizType: String,
  createdBy: Schema.Types.ObjectId,
  impressions: {
    type: Number,
    default: 0,
  },
  createdOn: String,
  questions: [QuestionSchema],
});

export default model("Quiz", QuizSchema);
