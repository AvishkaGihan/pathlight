import mongoose from "mongoose";

const CareerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  hollandCodes: [
    {
      code: {
        type: String,
        required: true,
        enum: [
          "Realistic",
          "Investigative",
          "Artistic",
          "Social",
          "Enterprising",
          "Conventional",
        ],
      },
      score: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
    },
  ],
  description: String,
  coreSkills: [String],
  averageSalary: {
    min: Number,
    max: Number,
  },
});

// Create index for efficient querying by Holland Code
CareerSchema.index({ "hollandCodes.code": 1 });

const Career = mongoose.model("Career", CareerSchema);

export default Career;
