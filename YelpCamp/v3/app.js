// Require Modules
var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var Campground=require("./models/campground")
var seedDB=require("./seeds")
seedDB();
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
			res.render("index",{campgrounds:allcampgrounds});
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
	res.render("new");
});
// SHOW Route
app.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		} else{
			res.render("show",{campground:foundCampground});
		}
	})
});

app.listen("3000",function(){
	console.log(" The Yelp Camp Server Was started!!!");
});