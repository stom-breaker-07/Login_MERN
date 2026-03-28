const express=require('express');
const router=express.Router();
const RegisterDoc=require('../controllers/RegisterController');

router.post("/register",RegisterDoc);

module.exports = router;