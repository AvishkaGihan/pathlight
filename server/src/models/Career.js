import mongoose from "mongoose";

const CareerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  hollandCode: {
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
  description: String,
  coreSkills: [String],
  averageSalary: {
    min: Number,
    max: Number,
  },
});

// Create index for efficient querying by Holland Code
CareerSchema.index({ hollandCode: 1 });

const Career = mongoose.model("Career", CareerSchema);

export default Career;
