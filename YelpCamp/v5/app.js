// Require Modules
var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var Campground=require("./models/campground");
var Comment=require("./models/comment");
var seedDB=require("./seeds");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp_camp_v2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

// APP CONFIGURATION

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));


// ROUTES
// 1. LANDING Page
app.get("/",function(req,res){
	res.render("landing")
});
// INDEX Route
app.get("/campgrounds",function(req,res){
	// Find Campgrounds from Data Base
	Campground.find({},function(err,allcampgrounds){
		if(err){
			console.log(err);
		} else{
			res.render("campgrounds/index",{campgrounds:allcampgrounds});
		}
	});
});
// CREATE Route
app.post("/campgrounds",function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var newCampground={name:name,image:image,description:desc};
	Campground.create(newCampground,function(err,newlycreated){
		if(err){
			console.log(err);
		} else{
			res.redirect("/campgrounds");
		}
	})
});
// NEW Route
app.get("/campgrounds/new",function(req,res){
	res.render("campgrounds/new");
});
// SHOW Route
app.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		} else{
			res.render("campgrounds/show",{campground:foundCampground});
		}
	})
});


//=================================================
// COMMENTS ROUTES
//=================================================

app.get("/campgrounds/:id/comments/new",function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		} else{
			res.render("comments/new",{campground:campground});
		}
	});
});

app.post("/campgrounds/:id/comments",function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				} else{
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});
app.listen("3000",function(){
	console.log(" The Yelp CampServer Was started!!!");
});