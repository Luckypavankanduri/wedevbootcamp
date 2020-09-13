var express=require("express");
var app=express();
var bodyParser=require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp_camp_v2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var campgroundSchema=new mongoose.Schema({
	name:String,
	image:String,
	description:String
});
var Campground = mongoose.model("Campground",campgroundSchema);

/*Campground.create({
	name:"Lake",
	image:"https://images.pexels.com/photos/2516423/pexels-photo-2516423.jpeg?auto=compress&cs=tinysrgb&h=350",
	description:"This is a beautiful place in the world.It has  Internet facility also."
},function(err,campground){
	if(err){
		console.log(err);
	} else{
		console.log(campground);
	}
});*/

app.get("/",function(req,res){
	res.render("landing")
});
// INDEX Route
app.get("/campgrounds",function(req,res){
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
	Campground.findById(req.params.id, function(err,foundCampground){
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