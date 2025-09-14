// Need to implement the actual IPIP scoring logic
export const calculateBigFiveScores = (answers) => {
  // Implementation based on actual IPIP scoring methodology
  // Each question contributes to specific traits
  // Questions may need reverse scoring
  const scores = {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0,
  };

  answers.forEach((answer, index) => {
    const questionId = index + 1;
    let score = answer.score;

    // Apply reverse scoring for specific questions
    if ([9, 12, 18, 19, 20].includes(questionId)) {
      score = 6 - score; // Reverse score (1-5 becomes 5-1)
    }

    // Map questions to traits (this needs the actual mapping)
    if ([1, 6, 11, 16].includes(questionId)) scores.openness += score;
    if ([2, 7, 12, 17].includes(questionId)) scores.conscientiousness += score;
    if ([3, 8, 13, 18].includes(questionId)) scores.extraversion += score;
    if ([4, 9, 14, 19].includes(questionId)) scores.agreeableness += score;
    if ([5, 10, 15, 20].includes(questionId)) scores.neuroticism += score;
  });

  // Normalize scores to 0-1 range
  Object.keys(scores).forEach((trait) => {
    scores[trait] = scores[trait] / 20; // Each trait has 4 questions, max score 20
  });

  return scores;
};

export const mapScoresToHollandCodes = (scores) => {
  const codes = [];
  const threshold = 0.6;

  // More sophisticated mapping based on research
  if (scores.extraversion >= threshold && scores.agreeableness >= threshold)
    codes.push("Social");
  if (scores.extraversion >= threshold && scores.conscientiousness >= threshold)
    codes.push("Enterprising");
  if (scores.openness >= threshold && scores.conscientiousness >= threshold)
    codes.push("Investigative");
  if (scores.openness >= threshold && scores.agreeableness >= threshold)
    codes.push("Artistic");
  if (scores.conscientiousness >= threshold && scores.neuroticism <= 0.4)
    codes.push("Conventional");
  if (
    scores.neuroticism >= threshold ||
    (scores.conscientiousness >= threshold && scores.extraversion <= 0.4)
  )
    codes.push("Realistic");

  return codes.length > 0 ? [...new Set(codes)] : ["Social", "Investigative"];
};
