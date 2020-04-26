const express= require('express');
const expressLayoutes=require('express-ejs-layouts');
const bodyParser=require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport= require('passport');
const localStrategy=require('./authentication/passport');
const indexRouter=require('./routes/index');
const userRouter=require('./routes/users');

const app =express();

// using body parser to parse the request body object
app.use(bodyParser.urlencoded({extended:false}));

// running passport config
localStrategy(passport);

//setting up flash messages middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

// passport middlewares
app.use(passport.initialize());
app.use(passport.session());

// Setting some globally known variable 
app.use(function(req, res, next) {
    res.locals.success_register = req.flash('success_register');
    res.locals.error_register = req.flash('error_register');
    res.locals.error = req.flash('error');
    next();
});

// using ejs middleware == ejs as our view engine
app.use(expressLayoutes);
app.set('view engine','ejs');


app.use('/',indexRouter);
app.use('/users',userRouter);


const PORT= process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});