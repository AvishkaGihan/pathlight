import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../../.env");

dotenv.config({ path: envPath });

import { GoogleGenAI } from "@google/genai";

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

export const getEnhancedCareersFromGemini = async (
  bigFiveScores,
  initialCareers
) => {
  if (!ai) {
    throw new Error(
      "Gemini API is not configured - GEMINI_API_KEY environment variable is missing"
    );
  }

  try {
    const prompt = `
You are an expert career counselor. Analyze this personality profile and suggest the most suitable careers.

Big Five Personality Scores (0-1 scale):
- Openness: ${bigFiveScores.openness.toFixed(2)}
- Conscientiousness: ${bigFiveScores.conscientiousness.toFixed(2)}
- Extraversion: ${bigFiveScores.extraversion.toFixed(2)}
- Agreeableness: ${bigFiveScores.agreeableness.toFixed(2)}
- Neuroticism: ${bigFiveScores.neuroticism.toFixed(2)}

Potential career matches: ${initialCareers.map((c) => c.title).join(", ")}

Please provide:
1. 3-5 most suitable careers from the list (prioritize best matches)
2. For each career, a brief explanation of why it suits this personality
3. 2-3 key skill gaps the person might need to address

Return ONLY valid JSON in this exact format:
[
  {
    "title": "career_title_string",
    "reason": "Explanation text",
    "skillGaps": ["Skill 1", "Skill 2", "Skill 3"]
  }
]
`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    console.log("Gemini Response:", response);
    const responseText = response.text;

    // Extract JSON from the response
    const jsonMatch =
      responseText.match(/```json\n([\s\S]*?)\n```/) ||
      responseText.match(/\[[\s\S]*\]/);
    const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : responseText;

    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to get enhanced career recommendations");
  }
};
