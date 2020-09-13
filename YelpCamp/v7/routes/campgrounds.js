var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
// INDEX Route => Show all Campgrounds
router.get("/",function(req,res){
	// GET all Campgrounds from DB
	Campground.find({},function(err,allcampgrounds){
		if(err){
			console.log(err); 
		} else{
			res.render("campgrounds/index",{campgrounds:allcampgrounds, currentUser:req.user});
		}
	});
});
// CREATE Route => Add a New campground with the details taken from New Form 
router.post("/", isLoggedIn, function(req,res){
	// GET data from form and add to Campground Array
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var newCampground={name:name,image:image,description:desc};
	// CREATE a New Campground and save it to DB
	Campground.create(newCampground,  function(err,newlycreated){
		if(err){
			console.log(err);
		} else{
			// REDIRECT To Campgrounds Page
			res.redirect("/campgrounds");
		}
	})
});
// NEW Route => Add a New campground Form
router.get("/new", isLoggedIn, function(req,res){
	res.render("campgrounds/new");
});
// SHOW Route => Show details of Particular Campground
router.get("/:id",function(req,res){
	// Find the Campground with Provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		} else{
			// Show the template of that Campground
			res.render("campgrounds/show",{campground:foundCampground});
		}
	})
});

// =========   CHECKING OF LOGGED IN OR NOT ===========
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports=router;