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
        const userId = req.userId;
        let updateData = { ...req.body };

        const fieldsToParse = ['personal_info', 'education', 'experience', 'project', 'skills'];

        fieldsToParse.forEach(field => {
            if (updateData[field] && typeof updateData[field] === 'string') {
                try {
                    updateData[field] = JSON.parse(updateData[field]);
                } catch (e) {
                    updateData[field] = field === 'personal_info' ? {} : [];
                }
            }
        });

        // FIX: Mapping Eksplisit & Pembersihan data Project
        if (updateData.project && Array.isArray(updateData.project)) {
            updateData.project = updateData.project.map(proj => ({
                name: proj.name || "",
                description: proj.description || "",
                // Ini kunci perbaikannya: memaksa field 'type_project' diisi
                type_project: proj.type_project || proj.type || "" 
            }));
        }

        if (req.file) {
            if (!updateData.personal_info) updateData.personal_info = {};
            updateData.personal_info.image = req.file.path;
        }

        // Gunakan updateData yang SUDAH DI-MAP di atas
        const updatedResume = await Resume.findOneAndUpdate(
            { _id: resumeId, user: userId },
            { 
                $set: {
                    ...updateData,
                    project: updateData.project // Timpa ulang secara eksplisit
                } 
            },
            { 
                returnDocument: 'after', 
                runValidators: true 
            }
        );

        if (!updatedResume) return res.status(404).json({ success: false, message: "Resume tidak ditemukan" });

        res.status(200).json({ success: true, resume: updatedResume });

    } catch (error) {
        console.error("DETEKSI ERROR:", error.message);
        res.status(500).json({ success: false, message: error.message });
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

export const getUserResume = async(req, res) => {
    try {
        const userId = req.userId; 

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized Access" });
        }

        const userResumes = await Resume.find({ user: userId }).sort({ updatedAt: -1 });
        
        return res.status(200).json({ 
            success: true, 
            count: userResumes.length,
            userResumes
        }); 
    } catch (error) {
        console.error("Error in userResume:", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const resume = await Resume.findById(resumeId);

        if (resume) {
            return res.status(200).json({ success: true, resume });
        } else {
            return res.status(404).json({ success: false, message: "Resume Not Found" });
        }
    } catch (error) {
        console.error("Error in getResumeById:", error.message);
        
        return res.status(500).json({ 
            success: false, 
            message: "Failed to fetch Resume. Format ID mungkin salah." 
        });
    }
}