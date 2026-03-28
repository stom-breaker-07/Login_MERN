const logoutCtrl=async (req,res)=>{
    try{
        console.log("Logout api called" , req.cookies);
         res.cookie('token','',{
         httpOnly: true,
         expires: new Date(0)
         })
        console.log("Logout api called" , res.cookies);
         res.status(200).json({message:"Logout Successfull"});
    }
    catch(e){
        res.status(400).json({message:"Error in Logout", error: e.message});
    }

}

module.exports = logoutCtrl;