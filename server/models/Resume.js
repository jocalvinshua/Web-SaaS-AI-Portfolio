import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    default: "Untitled Resume",
  },
  personalInfo: {
    fullName: String,
    jobTitle: String,
    phoneNumber: String,
    address: String,
    summary: String,
  },
  experience: [
    {
      company: String,
      role: String,
      startDate: String,
      endDate: String,
      description: String,
    },
  ],
  education: [
    {
      school: String,
      degree: String,
      city: String,
      graduationYear: String,
    },
  ],
  skills: [
    {
      name: String,
    },
  ],
  templateId: {
    type: String,
    default: "classic",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume