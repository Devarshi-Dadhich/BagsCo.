import bcrypt from "bcrypt";
import vendor from "../models/vendor.js";   
import generateToken from '../utils/generateToken.js';

const registerVendor = async(req,res)=>{
    bcrypt.genSalt(10, async(err, salt) => {
        if (err) {
            return res.status(500).send("Error generating salt");
        }
        bcrypt.hash(req.body.password, salt, async(err, hash) => {
            if (err) {
                return res.status(500).send("Error hashing password");
            }
            
            const {fullname, email, password, contact} = req.body;
            try {
                if(!req.body.fullname || !req.body.email || !req.body.password || !req.body.contact){
                    return res.status(400).send("Please fill all the fields");
                }
                const existingVendor = await vendor.findOne({email});
                if (existingVendor) {
                    return res.status(400).send("Vendor already exists");
                }
                  const createdVendor = await vendor.create({
                    fullname,
                    email,
                    password: hash,
                    contact
                })
                const token = generateToken(createdVendor);
                res.cookie("token", token);
            res.redirect("/products");
            } catch (error) {
                console.error(error);
                res.status(500).send("Server error");
            }  

        });
    }
  
)};

const loginVendor = async(req,res)=>{
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).send("Please fill all the fields");
        }
        const existingVendor = await vendor.findOne({email});
        if (!existingVendor) {
            return res.status(400).send("Vendor does not exist");
        }
        const isMatch = await bcrypt.compare(password, existingVendor.password);
        if (!isMatch) {
            return res.status(400).send("Invalid credentials");
        }
        const token = generateToken(existingVendor);
        res.cookie("token", token);
        res.redirect("/products");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}

export {loginVendor, registerVendor};