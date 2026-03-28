const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');

dotenv.config();



const protect=async (req,res,next)=>{
    try{
        //get token 
        const token=req.cookies.token;
        console.log("Token from cookie:", token);

        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        // 2. Verify token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        

        // 3. Attach user to request
        req.user = decoded;

        console.log("Decoded token:", decoded);

        next(); // go to next step (route)

    }
    catch(e){
        console.log(req.body);
        return res.status(401).json({ message: "Not authorized, invalid token 2" } );
    }
}

module.exports = protect ;