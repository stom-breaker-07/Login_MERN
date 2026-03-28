const express=require('express');
const router=express.Router();
const loginController=require('../controllers/loginController');

router.post('/v1/login',loginController);

module.exports=router;