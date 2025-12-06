import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Resume from "../models/Resume.js"


//GENERATING TOKEN----->
const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
    return token
}


//CONTROLLER FOR USER REGISTRATION----->
export const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body

        //Check any field is missing----->
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({
                    message: "Missing details"
                })
        }

        //Finding if user already exists----->
        const user = await User.findOne({ email })
        if (user) {
            return res
                .status(400)
                .json({
                    message: "E-mail already exists"
                })
        }

        //Password hashing----->
        const hashedPassword = await bcrypt.hash(password, 10)

        //Creating new user----->
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        //Generating token----->
        const token = generateToken(newUser._id)
        newUser.password = undefined;

        res
            .status(201)
            .json({
                message: "Account created",
                user: newUser,
                token
            })

    } catch (error) {
        console.log(error.message)
        res
            .status(500)
            .json({
                message: "Internal server error"
            })
    }
}


//CONTROLLER FOR USER LOGIN----->
export const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body

        //Check any field is missing----->
        if (!email || !password) {
            return res
                .status(400)
                .json({
                    message: "Missing details"
                })
        }

        //Finding if user already exists----->
        const user = await User.findOne({ email })
        if (!user) {
            return res
                .status(400)
                .json({
                    message: "Invalid credentials"
                })
        }

        //Check if password is correct----->
        if (!user.comparePassword(password)) {
            return res
                .status(400)
                .json({
                    message: "Invalid credentials"
                })
        }

        //Return success message----->
        const token = generateToken(user._id)
        user.password = undefined;

        res
            .status(200)
            .json({
                message: "Login successful",
                user,
                token
            })

    } catch (error) {
        console.log(error.message)
        res
            .status(500)
            .json({
                message: "Internal server error"
            })
    }
}


//CONTROLLER FOR GETTING USER BY ID----->
export const getUserById = async (req, res) => {
    try {
        const userId = req.userId;

        //check if user exists----->
        const user = await User.findById(userId)
        if (!user) {
            return res
                .status(400)
                .json({
                    message: "User not found"
                })
        }

        //return user----->
        user.password = undefined
        return res
            .status(200)
            .json({
                user
            })

    } catch (error) {
        console.log(error.message)
        res
            .status(500)
            .json({
                messahe: "Internal server error"
            })
    }
}


//CONTROLLER FOR GETTING USER RESUME----->
export const getUserResume = async (req, res) => {
    try {
        const userId = req.userId
        const resume = await Resume.find({ userId })
        return res
            .status(200)
            .json({
                resume
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