import QuizSubmission from "../models/QuizSubmission.js";
import PersonalityReport from "../models/PersonalityReport.js";
import { generateCareerRecommendations } from "../services/recommendationService.js";

export const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    const userId = req.user._id;

    // Validate answers
    if (!answers || !Array.isArray(answers) || answers.length !== 20) {
      return res.status(400).json({
        success: false,
        message: "Invalid quiz answers. Exactly 20 answers are required.",
        code: "INVALID_QUIZ_DATA",
      });
    }

    // Save quiz submission
    const quizSubmission = new QuizSubmission({
      userId,
      answers,
    });

    await quizSubmission.save();

    // Generate recommendations (this might take some time)
    // For better UX, you might want to process this asynchronously
    const recommendationResult = await generateCareerRecommendations(
      answers,
      userId
    );

    // Save personality report
    const personalityReport = new PersonalityReport({
      submissionId: quizSubmission._id,
      userId,
      bigFiveScores: recommendationResult.bigFiveScores,
      inferredHollandCodes: recommendationResult.hollandCodes,
      recommendations: recommendationResult.recommendations,
      aiServiceUsed: recommendationResult.aiServiceUsed,
    });

    await personalityReport.save();

    res.status(201).json({
      success: true,
      message: "Quiz submitted successfully. Recommendations generated.",
      submissionId: quizSubmission._id,
    });
  } catch (error) {
    console.error("Quiz submission error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process quiz submission",
      code: "QUIZ_PROCESSING_ERROR",
    });
  }
};
