import express from 'express';
import user from '../models/user.js'

const router = express.Router();

router.get("/",(req,res)=>{
    const  isLoggedIn = !!req.user

    res.render("home",{isLoggedIn})
})

export default router;