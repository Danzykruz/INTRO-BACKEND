import { Router} from "express";
import {createPost, getPosts, updatePost, deletePost} from "../controllers/post.controller.js";

const router = Router();

router.route('/create').post(createPost);
router.route('/getPost').get(getPosts);
router.route('/update/:id').patch(updatePost);
router.route('/deletePost/:id').delete(deletePost);

export default router;