// import jwt from 'jsonwebtoken'



// const protect = async (req, res, next) => {
//     const token = req.headers.authorization
//     if (!token) {
//         return res.status(401).json({
//             message: "Unauthorize access"
//         })
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         req.userId = decoded.userId
//         next()
//     } catch (error) {
//         console.log(error.message)
//         return res.status(401).json({
//             message: "Unauthorize access"
//         })
//     }
// }


// export default protect;

import jwt from 'jsonwebtoken'

const protect = async (req, res, next) => {
    const token = req.headers.authorization // directly token, no "Bearer"
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // assign decoded userId
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ message: "Unauthorized access" });
    }
}

export default protect;
