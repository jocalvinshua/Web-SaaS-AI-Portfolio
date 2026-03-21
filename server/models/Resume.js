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
        full_name: String,
        profile_img: String,
        email: String,
        phone: String,
        location: String,
        profession: String,
        linkedin: String,
        website: String,
    },
    summary: {
        type: String
    },
    experience: [
        {
            position: String,
            company: String,
            start_date: String,
            end_date: String,
            is_current: Boolean,
            description: String,
        },
    ],
    education: [
        {
            institution: String,
            degree: String,
            field: String,
            graduation_date: String,
            gpa: String
        },
    ],
    project:[
        {
            name: String,
            type_project: String,
            description: String,
        }
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
}, {timestamps: true});

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume