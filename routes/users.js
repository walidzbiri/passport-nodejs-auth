// users routes
const express = require('express');
const { registerValidation, errorHandler} = require('../validation/register');
const User=require('../models/user');
const bcrypt =require('bcrypt');
const passport= require('passport');
const {forwardAuthenticated}=require('../authentication/auth');

const router=express.Router();

router.get('/login',forwardAuthenticated,(req,res,next)=>{
     res.render('login')
});

router.get('/register',forwardAuthenticated,(req,res,next)=>{
    res.render('register');
});

router.post('/register',registerValidation,errorHandler,(req,res,next)=>{    
    const {name,email,password,password2}=req.body;
    if(res.locals.errors.isEmpty()){
        // deconstructing
        bcrypt.hash(password, 10, function(err, hash) {
            console.log(hash)
            // Store hash in your password DB.
            User.create({name,email,password:hash}).then(user => {
                console.log(user);
                // Set a flash message by passing the key, followed by the value.
                req.flash('success_register', 'Register succeeded, you can login');
                res.redirect('/users/login');
            });
        });
    }else{
        res.render('register',{
            errors:res.locals.errors.errors,
            name,
            email,
            password,
            password2
        });
    }
});

router.post('/login', passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/users/login',failureFlash: true }));
router.get('/logout', function(req, res){
    req.logout();
    req.flash("success_register","You are logged out");
    res.redirect('/users/login');
  });
module.exports=router;