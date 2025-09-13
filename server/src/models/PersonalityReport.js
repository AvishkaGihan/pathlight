import mongoose from "mongoose";

const { Schema, model } = mongoose;

const RecommendationSchema = new Schema({
  careerId: {
    type: Schema.Types.ObjectId,
    ref: "Career",
    required: true,
  },
  reason: String,
  skillGaps: [String],
});

const PersonalityReportSchema = new Schema(
  {
    submissionId: {
      type: Schema.Types.ObjectId,
      ref: "QuizSubmission",
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bigFiveScores: {
      openness: Number,
      conscientiousness: Number,
      extraversion: Number,
      agreeableness: Number,
      neuroticism: Number,
    },
    inferredHollandCodes: [String],
    recommendations: [RecommendationSchema],
    aiServiceUsed: Boolean,
  },
  {
    timestamps: true,
  }
);

export default model("PersonalityReport", PersonalityReportSchema);
