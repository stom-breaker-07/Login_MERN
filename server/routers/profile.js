const express=require('express');
const router=express.Router();
const User=require('../modules/User');

const protect = require('../middleware/authMiddleware');

router.get('/profile', protect, async (req,res)=>{
    try{
        const user= await User.findById(req.user.userId).select('-password');
        console.log("User ID from token:", req.userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        res.status(200).json({message:"Profile fetched successfully", user});
    }
    catch(e){
        console.error("Error fetching profile:", e);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports=router;