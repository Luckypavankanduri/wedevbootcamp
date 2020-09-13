var express = require("express");
var router  = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");


router.get("/new", isLoggedIn, function(req,res){
	// Find Campground By ID
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		} else{
			res.render("comments/new",{campground:campground});
		}
	});
});

router.post("/", isLoggedIn, function(req,res){
	// Look Campground with that ID
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				} else{
					//comment.author.id = req.user._id;
					//comment.author.username=req.user.username;
					//comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
	// Create New Comment
	// Connect New Comment to Campground
	// Redirect to Show Page
});

// =========   CHECKING OF LOGGED IN OR NOT ===========
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}



module.exports=router;