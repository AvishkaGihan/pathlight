import Roadmap from "../models/Roadmap.js";

export const createRoadmap = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user._id;

    const roadmap = new Roadmap({
      userId,
      title,
      content,
    });

    await roadmap.save();

    res.status(201).json({
      success: true,
      message: "Roadmap saved successfully",
      roadmap: {
        id: roadmap._id,
        title: roadmap.title,
        content: roadmap.content,
        createdAt: roadmap.createdAt,
      },
    });
  } catch (error) {
    console.error("Create roadmap error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save roadmap",
      code: "ROADMAP_SAVE_ERROR",
    });
  }
};

export const getUserRoadmaps = async (req, res) => {
  try {
    const userId = req.user._id;

    const roadmaps = await Roadmap.find({ userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      roadmaps: roadmaps.map((roadmap) => ({
        id: roadmap._id,
        title: roadmap.title,
        content: roadmap.content,
        createdAt: roadmap.createdAt,
        updatedAt: roadmap.updatedAt,
      })),
    });
  } catch (error) {
    console.error("Get user roadmaps error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve roadmaps",
      code: "ROADMAP_RETRIEVAL_ERROR",
    });
  }
};

export const getRoadmap = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const roadmap = await Roadmap.findOne({ _id: id, userId });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
        code: "ROADMAP_NOT_FOUND",
      });
    }

    res.json({
      success: true,
      roadmap: {
        id: roadmap._id,
        title: roadmap.title,
        content: roadmap.content,
        createdAt: roadmap.createdAt,
        updatedAt: roadmap.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get roadmap error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve roadmap",
      code: "ROADMAP_RETRIEVAL_ERROR",
    });
  }
};

export const deleteRoadmap = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const roadmap = await Roadmap.findOneAndDelete({ _id: id, userId });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
        code: "ROADMAP_NOT_FOUND",
      });
    }

    res.json({
      success: true,
      message: "Roadmap deleted successfully",
    });
  } catch (error) {
    console.error("Delete roadmap error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete roadmap",
      code: "ROADMAP_DELETE_ERROR",
    });
  }
};
