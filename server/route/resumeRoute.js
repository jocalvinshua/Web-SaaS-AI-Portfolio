import express from 'express'
import { createResume, deleteResume, editResume, getResumeById, getUserResume, saveResume } from '../controller/resumeController.js'
import upload from '../middleware/Multer.js'
import authMiddleware from '../middleware/Auth.js'

const resumeRouter = express.Router()

resumeRouter.use(authMiddleware);
resumeRouter.post('/create', createResume)
resumeRouter.put('/save/:resumeId', upload.single("profile_image"), saveResume )
resumeRouter.patch('/edit-title', editResume)
resumeRouter.delete('/delete/:resumeId', deleteResume)
resumeRouter.get('/my-resumes', getUserResume)
resumeRouter.get('/resume/:resumeId', getResumeById)

export default resumeRouter