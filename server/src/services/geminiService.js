import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({});

export const getEnhancedCareersFromGemini = async (
  bigFiveScores,
  initialCareers
) => {
  try {
    const prompt = `
Act as a career counselor. Analyze the following personality profile and initial career list.

Personality Scores (0-1): ${JSON.stringify(bigFiveScores)}

Initial Career Suggestions: ${initialCareers.map((c) => c.title).join(", ")}

Your task:
1. Refine and prioritize the list to 3-5 most suitable careers.
2. For each final career, suggest 2-3 critical skill gaps the user might need to address.

Return a valid JSON array of objects with this exact structure:
[{
  "careerId": "Career Name",
  "reason": "Brief reason for suitability based on personality",
  "skillGaps": ["Skill 1", "Skill 2"]
}]
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
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
