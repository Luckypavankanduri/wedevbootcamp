var express = require("express");
var router  = express.Router();
var passport=require("passport");
var User = require("../models/user");

// 1. LANDING Page
router.get("/",function(req,res){
	res.render("landing")
});

// Sign Up Form
router.get("/register", function(req, res){
   res.render("register"); 
});

// Handle Signup Logic 
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error",err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds"); 
        });
    });
});

// Login form
router.get("/login", function(req,res){
	res.render("login");
});

//Login Page
router.post("/login", passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}),function(req,res){
});

//Logout Form
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged You Out !!");
	res.redirect("/campgrounds");
});

// =========   CHECKING OF LOGGED IN OR NOT ===========
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
module.exports=router;