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
	image:String
});
var Campground = mongoose.model("Campground",campgroundSchema);

Campground.create({
	name:"Lake Camp",
	image:"https://images.pexels.com/photos/2516423/pexels-photo-2516423.jpeg?auto=compress&cs=tinysrgb&h=350"
},function(err,campground){
	if(err){
		console.log(err);
	} else{
		console.log(campground);
	}
});
var campgrounds=[
		{name:"Hill Camp",image:"https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e5074407c2c7edd934ecd_340.jpg"},
		{name:"Lake Camp",image:"https://images.pexels.com/photos/2516423/pexels-photo-2516423.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Forest Camp",image:"https://images.pexels.com/photos/2376997/pexels-photo-2376997.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Hill Camp",image:"https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e5074407c2c7edd934ecd_340.jpg"},
		{name:"Lake Camp",image:"https://images.pexels.com/photos/2516423/pexels-photo-2516423.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Forest Camp",image:"https://images.pexels.com/photos/2376997/pexels-photo-2376997.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Hill Camp",image:"https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e5074407c2c7edd934ecd_340.jpg"},
		{name:"Lake Camp",image:"https://images.pexels.com/photos/2516423/pexels-photo-2516423.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name:"Forest Camp",image:"https://images.pexels.com/photos/2376997/pexels-photo-2376997.jpeg?auto=compress&cs=tinysrgb&h=350"}
	]

app.get("/",function(req,res){
	res.render("landing")
});

app.get("/campgrounds",function(req,res){
	
	res.render("index",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var newCampground={name:name,image:image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds")
});

app.get("/campgrounds/new",function(req,res){
	res.render("new");
})

app.listen("3000",function(){
	console.log(" The Yelp Camp Server Was started!!!");
});