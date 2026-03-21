import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Access Denied. Please Login First!" 
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.id;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(401).json({ 
            success: false, 
            message: "Session is Over. Please Login again!" 
        });
    }
};

export default authMiddleware;