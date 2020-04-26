function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        req.flash('error_register','Please login to see your dashboard');
        res.redirect("/users/login");
    }
}
function forwardAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');      
  }
module.exports={
    checkAuthentication,
    forwardAuthenticated
}