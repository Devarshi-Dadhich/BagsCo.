import express from 'express';
import {registerVendor,loginVendor} from '../controllers/vendorRegister.js';
import {isLoggedIn ,isVendor}from '../middlewares/isLoggedIn.js';

const router = express.Router();

router.get("/apply",(req,res)=>{
    const  isLoggedIn = !!req.user
    res.render("contact",{isLoggedIn})
})   

router.get("/admin",isVendor,(req,res)=>{
    const  isLoggedIn = !!req.user;
    res.render("adminPanel",{isLoggedIn})
})

router.get("/login",(req,res)=>{
    res.render("vendorLogin")
})

router.post("/login",loginVendor)

router.post("/apply",registerVendor)  

export default router;