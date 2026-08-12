import { Router} from 'express';
import { protect } from "../middleware/auth.middleware.js";
import {loginOut, loginUser, registerUser} from "../controllers/user.controller.js";
const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(loginOut);
router.route('/me').get(protect, (req, res) => {
    res.status(200).json({ user: req.user});
});


export  default router;