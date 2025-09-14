import PersonalityReport from "../models/PersonalityReport.js";

export const getLatestReport = async (req, res) => {
  try {
    const userId = req.user._id;

    const report = await PersonalityReport.findOne({ userId })
      .sort({ createdAt: -1 })
      .populate("recommendations.careerId");

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "No personality report found for this user",
        code: "REPORT_NOT_FOUND",
      });
    }

    res.json({
      success: true,
      report: {
        reportId: report._id,
        bigFiveScores: report.bigFiveScores,
        inferredHollandCodes: report.inferredHollandCodes,
        recommendations: report.recommendations.map((rec) => ({
          careerId: rec.careerId._id,
          title: rec.careerId.title,
          reason: rec.reason,
          skillGaps: rec.skillGaps,
        })),
        generatedAt: report.createdAt,
      },
    });
  } catch (error) {
    console.error("Get report error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve personality report",
      code: "REPORT_RETRIEVAL_ERROR",
    });
  }
};
