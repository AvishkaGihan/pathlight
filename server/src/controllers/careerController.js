import Career from "../models/Career.js";

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
