import jwt from 'jsonwebtoken';
import user from '../models/user.js';
import vendor from '../models/vendor.js';

const isLoggedIn = async (req, res, next) => {
    if(!req.cookies.token){
        return res.redirect("/users/login");
    }
    try{
        let decoded  =  jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        let currentUser = await user.findById(decoded.id).select("-password -__v");
        if(!currentUser){
            return  res.redirect("/users/login");
        }
        req.user = currentUser;
        next()
    }
    catch(error){
        // res.send("error", "Something went wrong, please try again");
        console.error("Authentication error:", error);
        res.redirect("/");
    }
}
const isVendor = async (req, res, next) => {
    if(!req.cookies.token){
        return res.redirect("/users/login");
    }
    try{
        let decoded  =  jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        let currentVendor = await vendor.findById(decoded.id).select("-password -__v");
        if(!currentVendor){
            return res.redirect("/vendors/apply");
        }
        req.vendor = currentVendor;
        next()
    }
    catch(error){
        console.error("Authentication error:", error);
        res.redirect("/");
    }
}

// const loginVendor = async(req,res)=>{
//     const {email, password} = req.body;
//     try {
//         if(!email || !password){
//             return res.status(400).send("Please fill all the fields");
//         }
//         const existingUser = await user.findOne({email});
//         if (!existingUser) {
//             return res.status(400).send("User does not exist");
//         }
//         const isMatch = await bcrypt.compare(password, existingUser.password);
//         if (!isMatch) {
//             return res.status(400).send("Invalid credentials");
//         }
//         const token = generateToken(existingUser);
//         res.cookie("token", token);
//         res.redirect("/products");
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Server error");
//     }
// }

export { isLoggedIn, isVendor };
  
