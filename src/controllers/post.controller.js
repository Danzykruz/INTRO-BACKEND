import { Post } from "../models/post.model.js";

const createPost = async (req, res) => {
    try {
        const {name, description, age} = req.body

        if (!name || !description || !age) {
            return res.status(400).json({
                message: "cant create post:: All fields are required"
            });
        }
            const post = await Post.create({ name, description, age});

            res.status(201).json({
                message: "Post created Successfully", post
            });

    } catch (error) {
         res.status(500).json({
             message: "Internal Server Error",
             error: error.message
         })
    }
}

const getPosts = async (req,res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });

    }
}

const updatePost = async (req,res) => {
    try {
        if(Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "No data provided"
            });
        }
            const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});

            if (!post) return res.status(404).json({
                message: "post not found"
            });
            res.status(200).json({ message: "User Updated Successfully"});

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            Error: error.message
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.body);
        if(deleted) return res.status(404).json({
            message: "Post not Found "
        });
        res.status(200).json({
            message: "Post Deleted"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server",
            Error: error.message
        })
    }
}
export {
    createPost,
    getPosts,
    updatePost,
    deletePost
}