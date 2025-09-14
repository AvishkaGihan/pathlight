import mongoose from "mongoose";
import Career from "../models/Career.js";
import dotenv from "dotenv";

dotenv.config();

const careersData = [
  {
    title: "Software Developer",
    hollandCode: "Investigative",
    description: "Design, develop, and test software applications.",
    coreSkills: ["JavaScript", "Python", "Java", "SQL", "Git", "Algorithms"],
    averageSalary: { min: 60000, max: 120000 },
  },
  {
    title: "UX Designer",
    hollandCode: "Artistic",
    description: "Design user experiences for digital products.",
    coreSkills: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "UI Design",
      "Figma",
    ],
    averageSalary: { min: 50000, max: 100000 },
  },
  // Add more careers as needed
];

const populateCareers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Career.deleteMany({});
    await Career.insertMany(careersData);
    console.log("Careers data populated successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error populating careers:", error);
    process.exit(1);
  }
};

populateCareers();
