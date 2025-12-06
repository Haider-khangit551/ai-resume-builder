import express from 'express'
import protect from '../middlewares/authMiddleware.js'
import { enhanceJobDescription, enhanceProffessionalSummary, uploadResume } from '../controllers/aiController.js'

const aiRouter = express.Router()

aiRouter.post('/enhanced-pro-sum', protect, enhanceProffessionalSummary)
aiRouter.post('/enhanced-job-desc', protect, enhanceJobDescription)
aiRouter.post('/upload-resume', protect, uploadResume)

export default aiRouter