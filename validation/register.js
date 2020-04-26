const { check, validationResult } = require('express-validator');
const User=require('../models/user');

const registerValidation= [
        // email must be an email
        check('email').isEmail().withMessage('Invalid email format').bail()
                      .custom(async (value)=>{
                        const user= await User.findOne({
                            where:{email:value}
                        });
                        if(user==null){
                            return true;
                        }else{
                            throw new Error('Email already exists');
                        }
                      }),
        // password must be at least 5 chars long
        check('password').isLength({ min: 5 }).withMessage('Password must be at least 5 chars long'),
        check('password2').custom((value,{req})=>{
            if (value !== req.body.password) {
                throw new Error('Password confirmation is incorrect');
            }
            return true;
        }),
        // name must be at least 4 chars long
        check('name').isLength({ min: 4 }).withMessage('Name must be at least 4 chars long'),
]


const errorHandler=(req,res,next)=>{
    // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  console.log(errors);
  res.locals.errors=errors;
  next();
}


module.exports={
    registerValidation,
    errorHandler
}