import bcrypt from "bcrypt";
import user from "../models/user.js";   
import generateToken from '../utils/generateToken.js';

const registerUser = async(req,res)=>{
    bcrypt.genSalt(10, async(err, salt) => {
        if (err) {
            return res.status(500).send("Error generating salt");
        }
        bcrypt.hash(req.body.password, salt, async(err, hash) => {
            if (err) {
                return res.status(500).send("Error hashing password");
            }
            
            const {fullname, email, password} = req.body;
            try {
                if(!req.body.fullname || !req.body.email || !req.body.password){
                    return res.status(400).send("Please fill all the fields");
                }
                const existingUser = await user.findOne({email});
                if (existingUser) {
                    return res.status(400).send("User already exists");
                }
                  const createdUser = await user.create({
                    fullname,
                    email,
                    password: hash,
                })
                const token = generateToken(createdUser);
                res.cookie("token", token);
            res.redirect("/products");
            } catch (error) {
                console.error(error);
                res.status(500).send("Server error");
            }

        });
    }
  
)};

const loginUser = async(req,res)=>{
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).send("Please fill all the fields");
        }
        const existingUser = await user.findOne({email});
        if (!existingUser) {
            return res.status(400).send("User does not exist");
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).send("Invalid credentials");
        }
        const token = generateToken(existingUser);
        res.cookie("token", token);
        res.redirect("/products");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}

const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
}
export { registerUser, loginUser, logoutUser };