import express from 'express';
import bcrypt from 'bcrypt';
import product from '../models/product.js';
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

router.get("/cart/:id", isLoggedIn, async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = await user.findOne({ _id: userId }).populate('cart');
        if (!userData) {    
            return res.status(404).send("User not found");
        } 
        res.render("userCart", { cart: userData.cart });
        console.log(userData.cart);
    }
    catch (error) {
        console.error(error);
    }

});

router.post("/cart/remove/:id", async (req,res)=>{

    const productId = req.params.id;
    const currentUser = await user.findOne({ email: req.user.email })

    currentUser.cart = currentUser.cart.filter((item) => item.toString() !== productId.toString());
    await currentUser.save();

    res.redirect(`/users/cart/${currentUser._id}`);
})

router.get("/logout",logoutUser);

router.post("/login", loginUser);

router.post("/register",registerUser);



export default router;