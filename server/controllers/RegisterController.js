const User=require('../modules/User');
const bcrypt = require('bcryptjs');

const RegisterDoc= async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        if(!name||!email||!password){
            return res.status(400).json({message:"All fields are require"});
        }

        const ispresent= await User.findOne({email});
        if(ispresent){
             return res.status(400).json({message:"Email already Exist !!"});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);

        const user= await User.create({
            name,
            email,
            password:hashedPassword
        });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }
    catch(e){
        res.status(400).json({message:`e.message`});
    }
}

module.exports=RegisterDoc;