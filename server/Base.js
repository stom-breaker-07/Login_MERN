const express=require('express');
const cors=require('cors')
const ConnectDB=require('./config/ConnectDB');
const cookieParser=require('cookie-parser');


const GreetRoute=require('./routers/greeting')
const RegisterRoute=require('./routers/register');
const LoginRoute=require('./routers/login');
const ProfileRoute=require('./routers/profile');
const LogoutRoute=require('./routers/logout');

const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
// DataBase Connection 
ConnectDB();

//Home
app.get('/',(req,res)=>{ 
    res.send(`<h1>Home</h1>`);
})

//Greet api
app.use('/api',GreetRoute);

//Register api
app.use("/api",RegisterRoute);

//login api
app.use('/api',LoginRoute);

//Profile api
app.use('/api',ProfileRoute);

//Logout api
app.use('/api',LogoutRoute);
try{
    app.listen(5000,(e)=>{
    console.log("server running in pot 5000 ${http://localhost:5000/}");
})
}
catch(e){
    console.log(e);
}  