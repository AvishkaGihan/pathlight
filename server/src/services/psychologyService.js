export const calculateBigFiveScores = (answers) => {
  // Implementation based on IPIP scoring methodology
  // This is a simplified example - adjust based on your actual questionnaire
  const scores = {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0,
  };

  answers.forEach((answer) => {
    // Add your specific scoring logic here
    // Different questions contribute to different traits
  });

  // Normalize scores (0-1 range)
  Object.keys(scores).forEach((trait) => {
    scores[trait] = scores[trait] / (answers.length / 5); // Adjust divisor based on your questionnaire
  });

  return scores;
};

export const mapScoresToHollandCodes = (scores) => {
  const codes = [];
  const threshold = 0.6;

  if (scores.extraversion >= threshold) codes.push("Social", "Enterprising");
  if (scores.openness >= threshold) codes.push("Artistic", "Investigative");
  if (scores.agreeableness >= threshold) codes.push("Social");
  if (scores.conscientiousness >= threshold) codes.push("Conventional");
  if (scores.neuroticism >= threshold) codes.push("Realistic");

  return codes.length > 0 ? [...new Set(codes)] : ["Social", "Investigative"];
};
