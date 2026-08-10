import { User } from "../models/user.model.js";

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

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email: email.toLowerCase()
        });
        if(!user) return res.status(400).json({
            message: "User not found"
        });
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            message: "INVALID CREDENTIALS"
        })
        res.status(200).json({
            message: "User LoggedIn",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })
    } catch (error) {
        res.status(500).json({
            message: " Internal Server Error"
        })
    }
}

export {
    registerUser,
    loginUser
};