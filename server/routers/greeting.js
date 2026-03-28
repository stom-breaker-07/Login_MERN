const express=require('express');
const router=express.Router();

const protect = require('../middleware/authMiddleware');

const Greetcontroller=require('../controllers/greetingController');

router.get('/Greet', protect, Greetcontroller);

module.exports = router;