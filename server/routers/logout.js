const express=require('express');
const router=express.Router();
const logoutCtrl=require('../controllers/logoutController');


router.get('/v1/logout',logoutCtrl);

module.exports=router;