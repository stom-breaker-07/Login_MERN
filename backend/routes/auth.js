import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

//Register
router.post('/register',async (req , res)=>{
    const {username,email,password}=req.body;
    try {
        if(!username || !email || !password){
            return res.status(400).json({message:"Please Fill and fields"})
        }
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: "User alerady Created"});
        }

        const user =await User.create({username,email,password});
        const token =generateToken (user._id);
        res.status(201).json({
            id:user._id,
            username:user.username,
            email:user.email,
            token:token
        });
    } catch (error) {
        res.status(500).json({message:"Server Error"});
    }
});

//Login 
router.post("/login",async(req,res)=>{
    const {email,password}=res.body;

    try {
        if(!email|| !password){
            return res.status(400).json({message:"Please Fill Correct Field"});
        }

        const user=await User.findOne({email});

        if(!user || !(await user.matchPasswor(password))){
             return res.status(400).json({message:"Invalid Credential"});
        }
        const token =generateToken (user._id);
         res.status(200).json({
            id:user._id,
            username:user.username,
            email:user.email,
            token: token
        })
    } catch (error) {
         res.status(500).json({message:"Server Error"});
    }
});


//Me
router.get("/me",protect,async(req,res)=>{
    res.status(200).json(req.user);
});

//Generate JWT token
const generateToken =(id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn : "2d"})
}

export default router;