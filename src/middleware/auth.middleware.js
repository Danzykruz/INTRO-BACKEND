import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const protect = async (req, res, next) => {
    console.log("AUTH HEADER RECEIVED:", req.headers.authorization);
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Not Authorized, no token"});
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Not authorized, user not found"});
        }
        req.user = user;
        next();
    } catch (error) {
            console.log("JWT VERIFY ERROR:", error.message);
            return res.status(401).json({ message: "Not authorized, token invalid"});
    }
}