export function calculateEcoScore(input: {
  energyEfficiency: number;
  wasteManagement: number;
  waterConservation: number;
  certifications: string[];
}): {
  overallScore: number;
  color: "red" | "amber" | "green";
  factors: { label: string; score: number }[];
} {
  const certBonus = Math.min(input.certifications.length, 3) * 5;
  const raw =
    input.energyEfficiency * 0.35 +
    input.wasteManagement * 0.35 +
    input.waterConservation * 0.3;

  const overallScore = Math.min(raw + certBonus, 100);

  let color: "red" | "amber" | "green";
  if (overallScore < 40) color = "red";
  else if (overallScore < 80) color = "amber";
  else color = "green";

  return {
    overallScore: Math.round(overallScore),
    color,
    factors: [
      { label: "Energy", score: input.energyEfficiency },
      { label: "Waste", score: input.wasteManagement },
      { label: "Water", score: input.waterConservation },
    ],
  };
}
