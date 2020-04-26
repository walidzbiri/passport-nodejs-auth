const Strategy = require('passport-local').Strategy;
const User= require('../models/user');
const bcrypt=require('bcrypt');

// configuring strategy
const localStrategy=(passport)=>{
    passport.use(new Strategy({ // or whatever you want to use
      usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
      passwordField: 'password'
    },
        async function(email, password, done) {
            const user= await User.findOne({
                where:{email:email}
            });
            if (!user) { return done(null, false,{message:"Email not registred"}); }
            // Load hash from your password DB.
            bcrypt.compare(password, user.password, function(err, result) {
                // result == true
                if (result) { return done(null, user); }
                else{
                     return done(null, false,{message:"Password incorrect"});
                }
            });
        }
      ));
      
      passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(async function(id, done) {
        const user=await User.findByPk(id);
        done(null,user);
      });
}

module.exports=localStrategy;