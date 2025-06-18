import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import user from '../models/user.js';
import { registerUser, loginUser ,logoutUser} from '../controllers/authController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';


const router = express.Router();

// router.get("/",(req,res)=>{
//     res.send("welcome and it's working!")
// })
// console.log(process.env.NODE_ENV);

router.get("/register",(req,res)=>{
    res.render("register");
});

router.get("/login",(req,res)=>{
    res.render("login");
});

router.get("/profile/:id",isLoggedIn, async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = await user.findOne({ _id: userId });
        if (!userData) {
            return res.status(404).send("User not found");
        }
        res.render("profile", { user: userData });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.get("/logout",logoutUser);

router.post("/login", loginUser);

router.post("/register",registerUser);



export default router;