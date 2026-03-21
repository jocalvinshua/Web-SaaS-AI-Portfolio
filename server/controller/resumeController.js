import Resume from "../models/Resume.js";

// Handle Create New Resume
export const createResume = async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.userId; // Dari authMiddleware

        if (!title) {
            return res.status(400).json({ success: false, message: "Resume Title Required!" });
        }

        const newResume = new Resume({
            title,
            user: userId,
            // Sisanya sesuai default dari frontend
        });

        await newResume.save();

        return res.status(201).json({ 
            success: true, 
            message: "Resume created successfully", 
            resume: newResume 
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Handle Save/Update Full Resume Data
export const saveResume = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const updateData = req.body; // Mengambil seluruh object resume dari frontend
        const userId = req.userId;

        // Cari dan Update hanya jika resume tersebut milik user yang login
        const updatedResume = await Resume.findOneAndUpdate(
            { _id: resumeId, user: userId },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedResume) {
            return res.status(404).json({ success: false, message: "Resume not found or unauthorized" });
        }

        return res.status(200).json({ success: true, resume: updatedResume });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Handle edit resume title only
export const editResume = async (req, res) => {
    try {
        const { resumeId, title } = req.body;
        const userId = req.userId;

        const updatedResume = await Resume.findOneAndUpdate(
            { _id: resumeId, user: userId },
            { title },
            { new: true }
        );

        if (!updatedResume) {
            return res.status(404).json({ success: false, message: "Update failed" });
        }

        return res.status(200).json({ success: true, title: updatedResume.title });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Handle delete resume
export const deleteResume = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const userId = req.userId;

        const deletedResume = await Resume.findOneAndDelete({ _id: resumeId, user: userId });

        if (!deletedResume) {
            return res.status(404).json({ success: false, message: "Resume not found" });
        }

        return res.status(200).json({ success: true, message: "Resume deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getUserResume = async(req,res)=>{
    try {
        const {userId} = req.userId;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized Access. Login Again" });
        }

        const userResumes = await Resume.find({ user: userId }).sort({ updatedAt: -1 });
        return res.status(200).json({ 
            success: true, 
            count: userResumes.length,
            userResumes 
        }); 
    } catch (error) {
        console.error("Error in userResume:", error.message);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to fetch User Resume." 
        });
    }
}