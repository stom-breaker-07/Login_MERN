const User=require('../modules/User');
const bcrypt=require('bcryptjs');

const jwt=require('jsonwebtoken');
const cookie=require('cookie-parser');

const UserDoc= async(req,res)=>{
     try{
        const {email,password}=req.body;

        if(!email||!password){
            return res.status(400).json({message:"Ley don't submit Empty!"});
        }

        const user= await User.findOne({email});
         if(!user){
           return res.status(400).json({message:"Bro you are Not Registered !!"});
         }

         const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
             return res.status(400).json({message:"Bro Password Incorrect !!"});
        }

        const token=jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        //cookie 
        res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(201).json({message:"Logged In"});
     }
     catch(e){
         return res.status(400).json({message:e.message});
     }
 
}

module.exports= UserDoc ;
