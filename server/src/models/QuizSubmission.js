import mongoose from "mongoose";

const { Schema, model } = mongoose;

const AnswerSchema = new Schema({
  questionId: {
    type: Number,
    required: true,
    min: 1,
    max: 20,
  },
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

const QuizSubmissionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answers: [AnswerSchema],
  },
  {
    timestamps: true,
  }
);

export default model("QuizSubmission", QuizSubmissionSchema);
