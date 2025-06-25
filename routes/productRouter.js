import express from 'express';
import Product from '../models/product.js';
import multer from 'multer';
import { storage } from '../utils/cloudinary.js';
import user from '../models/user.js';
import {isLoggedIn ,isVendor }from '../middlewares/isLoggedIn.js';
import loginStatus from '../middlewares/loginStatus.js';
import ListProducts from '../controllers/productListing.js';

const router = express.Router();

const upload  = multer({ storage: storage });

router.get("/", async(req,res)=>{
    const  isLoggedIn = !!req.user;
    const products =await Product.find();
    if (!products) {
        return res.send("No products found");
    }
    res.render("products",{ products, isLoggedIn })
})

router.get("/shop/:id",isLoggedIn,async(req,res)=>{
    const isLoggedIn = !!req.user;
    const productId = req.params.id;
    const product = await Product.findOne({ _id:productId });
    if (!product) {
        return res.send("Product not found");
    }
    res.render("productDetails",{ product , isLoggedIn  })
})

router.get("/cart/:id",isLoggedIn, async (req, res) => {
    try {
        const productId = req.params.id;
        const currentUser = await user.findOne({ email: req.user.email })

        if (!currentUser.cart) currentUser.cart = [];
        
        currentUser.cart.push(productId)
        await currentUser.save();
        
        const productsInCart = await Product.find({ _id: { $in: currentUser.cart } });
        
        if (!productsInCart || productsInCart.length === 0) { 
            return res.status(404).send("Product not found");
        }
        
        res.render("cart", { product: productsInCart});

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.get("/payment",isLoggedIn,(req,res)=>{
    const isLoggedIn = !!req.user;
    res.render("payment",{ isLoggedIn });
})

router.post("/add",isVendor, upload.single('image'), ListProducts)

router.post('/upload', upload.single('image'), (req, res) => {
  res.send({
    image: req.file.path
  });
});

export default router;