const express = require('express');
const {checkAuthentication,forwardAuthenticated }= require('../authentication/auth');

const router=express.Router();

router.get('/',forwardAuthenticated,(req,res,next)=>{
     res.render('home');
});

router.get('/dashboard',checkAuthentication,(req,res,next)=>{
     res.render('dashboard',{
          name:req.user.name
     });
});

module.exports=router;