import Career from "../models/Career.js";
import { generateDetailedRoadmap } from "../services/geminiService.js";

export const getCareerRoadmap = async (req, res) => {
  try {
    const { careerId } = req.params;

    const career = await Career.findById(careerId);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career not found",
        code: "CAREER_NOT_FOUND",
      });
    }

    res.json({
      success: true,
      career: {
        careerId: career._id,
        title: career.title,
        description: career.description,
        coreSkills: career.coreSkills,
        averageSalary: career.averageSalary,
      },
    });
  } catch (error) {
    console.error("Get career roadmap error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve career roadmap",
      code: "ROADMAP_RETRIEVAL_ERROR",
    });
  }
};

export const getDetailedCareerRoadmap = async (req, res) => {
  try {
    const { careerId } = req.params;

    const career = await Career.findById(careerId);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career not found",
        code: "CAREER_NOT_FOUND",
      });
    }

    // Generate detailed roadmap using Gemini
    const detailedRoadmap = await generateDetailedRoadmap(
      career.title,
      career.coreSkills,
      career.description
    );

    res.json({
      success: true,
      career: {
        careerId: career._id,
        title: career.title,
        description: career.description,
        coreSkills: career.coreSkills,
        averageSalary: career.averageSalary,
        detailedRoadmap,
      },
    });
  } catch (error) {
    console.error("Get detailed career roadmap error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate detailed career roadmap",
      code: "DETAILED_ROADMAP_ERROR",
    });
  }
};
