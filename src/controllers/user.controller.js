import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    try {
        const { username, email, password} = req.body;
        //basic validation
         if (!username || !email || !password){
             return res.status(400).json({message: "All fields are reqiured"})
         }

         const existing = await User.findOne({email: email.toLowerCase()});
         if(existing){
             return res.status(400).json({message: "user already existing"})
         }

         const user = await User.create({
             username,
             email: email.toLowerCase(),
             password,
             loggedIn: false
         });
         res.status(201).json({message: "User created succesfully",
         user: {ID: user._id, email: user.email, username: user.username}
         })
    } catch (error) {
     res.status(500).json({message: " Internal server error", error: error.message});
    }
};

const loginUser = async (req, res) =>  {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(401).json({ message: "All Field Are Required"})
        }

        const user = await User.findOne({email: email.toLowerCase()
        });
        if(!user) return res.status(401).json({
            message: "User not found"
        });
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            message: "INVALID CREDENTIALS"
        });
        const generateToken = (userId) => {
            return jwt.sign(
                { id: userId },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

        };
        const token = generateToken(user._id);

        res.status(200).json({
            message: "User LoggedIn",
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })
    } catch (error) {
        res.status(500).json({
            message: " Internal Server Error",
            error: error.message
        })
    }
}

const loginOut = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({
           email
        });
        if (!user) return res.status(400).json({
            message: "User not Found"
        });

        res.status(200).json({
            message: "LoggedOut Successfully"
        })
    } catch (error) {
        res.status(500).json({ message: " Internal Server Error"});
    }
}

export {
    registerUser,
    loginUser,
    loginOut
};