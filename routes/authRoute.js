const express=require('express');
const router=express.Router();
const {login,register}=require('../controller/authController');
const validateAuth=require('../middleware/validation')


router.post('/login',validateAuth,login);

router.post('/register',validateAuth,register);

module.exports=router;