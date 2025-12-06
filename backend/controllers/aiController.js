import ai from "../configs/ai.js"
import Resume from "../models/Resume.js"

//CONTROLLER FOR ENHANDING A RESUME ' S PROFESSIONAL SUMMARY----->
//POST: /API/AI/ENHANCE-PRO-SUM----->
export const enhanceProffessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body
        if (!userContent) {
            return res
                .status(400)
                .json({
                    message: "Missing required field"
                })
        }
        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting the key skills, experience, and career objectives. Make it compelling and ATS-friendly and only return text no options or anything else."
                },
                {
                    role: 'user',
                    content: userContent
                }
            ]
        })

        const enhancedContent = response.choices[0].message
        return res
            .status(200)
            .json({
                enhancedContent
            })

    } catch (error) {
        console.log(error.message)
        return res
            .status(500)
            .json({
                message: "Internal server error"
            })
    }
}


// CONTROLLER FOR ENHANCING RTHE JOB DESCRIPTION OF THE RESUME----->
// POST: /api/ai/enhance-jib-desc----->
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body
        if (!userContent) {
            return res
                .status(400)
                .json({
                    message: "Missing required field"
                })
        }
        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be 1-2 sentences also highlighting the responsibilities and achivements. Use action verbs and quantifiable results where possible. Make it compelling and ATS-friendly and only return text no options or anything else."
                },
                {
                    role: 'user',
                    content: userContent
                }
            ]
        })
        const enhancedContent = response.choices[0].message.content
        return res.status(200).json({ enhancedContent })
    } catch (error) {
        console.log(error.message)
        return res
            .status(500)
            .json({
                message: "Internal server error"
            })
    }
}


// CONTROLLER FOR UPLOAD A RESUME TO THE DATABASE----->
// POST: /api/ai/upload-resume----->
export const uploadResume = async (req, res) => {
    try {
        const userId = req.userId
        const { resumeText, title } = req.body
        if (!resumeText) {
            return res
                .status(400)
                .json({
                    message: "Missing required details"
                })
        }
        const systemPrompt = "You are an expert AI Agent to extract data from resume."
        const userPrompt = `extract data from this resume: ${resumeText}
        Provide data in the following JSON formate with no additional text before or after:
        {
        professional_summary: {
        type: String,
        default: ""
    },
    skills: [
        { type: String }
    ],
    personal_info: {
        image: {
            type: String,
            default: ''
        },
        full_name: {
            type: String,
            default: ''
        },
        profession: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        },
        location: {
            type: String,
            default: ''
        },
        linkedin: {
            type: String,
            default: ''
        },
        website: {
            type: String,
            default: ''
        }
    },
    experience: [
        {
            company: { type: String },
            position: { type: String },
            start_date: { type: String },
            end_date: { type: String },
            description: { type: String },
            is_current: { type: Boolean },
        }
    ],
    project: [
        {
            name: { type: String },
            type: { type: String },
            description: { type: String }
        }
    ],
    education: [
        {
            institution: { type: String },
            degree: { type: String },
            field: { type: String },
            graduation_date: { type: String },
            gpa: { type: String },
        }
    ],
        }
        `
        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: userPrompt
                }
            ],
            response_format: { type: "json_object" }
        })
        // const extractedData = response.choices[0].message
        // const parsedData = JSON.parse(extractedData)
        const extractedData = response.choices[0].message.content
        const parsedData = JSON.parse(extractedData)
        const newResume = await Resume.create({ userId, title, ...parsedData })
        return res
            .json({
                resumeId: newResume._id
            })
    } catch (error) {
        console.log(error.message)
        return res
            .status(500)
            .json({
                message: "Internal server error"
            })
    }
}