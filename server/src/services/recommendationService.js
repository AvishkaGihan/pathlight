import {
  calculateBigFiveScores,
  mapScoresToHollandCodes,
} from "./psychologyService.js";
import { getEnhancedCareersFromGemini } from "./geminiService.js";
import Career from "../models/Career.js";

export const generateCareerRecommendations = async (quizAnswers, userId) => {
  try {
    // 1. Calculate Big Five Personality Scores
    const bigFiveScores = calculateBigFiveScores(quizAnswers);

    // 2. Map Scores to Holland Codes (Rule-based Logic)
    const hollandCodes = mapScoresToHollandCodes(bigFiveScores);

    // 3. Fetch initial career matches from the database
    const initialCareers = await Career.find({
      hollandCode: { $in: hollandCodes },
    }).limit(10);

    // 4. Enhance and refine the list using Gemini AI
    let finalizedCareers;
    let aiServiceUsed = true;

    try {
      finalizedCareers = await getEnhancedCareersFromGemini(
        bigFiveScores,
        initialCareers
      );
    } catch (geminiError) {
      // Fallback Mechanism: If Gemini fails, use the rule-based results
      console.warn(
        "Gemini API failed, using fallback recommendations.",
        geminiError
      );
      finalizedCareers = initialCareers.map((career) => ({
        careerId: career._id,
        title: career.title,
        reason: `Your personality traits align with the ${career.hollandCode} Holland code.`,
        skillGaps: career.coreSkills.slice(0, 3), // Use first 3 core skills as "gaps"
      }));
      aiServiceUsed = false;
    }

    return {
      bigFiveScores,
      hollandCodes,
      recommendations: finalizedCareers,
      aiServiceUsed,
    };
  } catch (error) {
    console.error("Recommendation generation error:", error);
    throw error;
  }
};
