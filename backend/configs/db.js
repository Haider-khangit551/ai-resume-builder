import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Database Connected")
        })
        let mongodbURI = process.env.MONGO_URI
        const projectName = "resume-builder";

        if (!mongodbURI) {
            throw new Error("MONGO_URI not found.")
        }
        if (mongodbURI.endsWith('/')) {
            mongodbURI = mongodbURI.slice(0, -1)
        }

        await mongoose.connect(`${mongodbURI}/${projectName}`)

    } catch (error) {
        console.error("Error connecting to mongoDB:", error)
    }
}



export default connectDB