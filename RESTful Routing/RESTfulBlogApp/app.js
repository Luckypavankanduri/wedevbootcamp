var express = require("express");
var app = express();
var bodyParser =require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/restful_blog_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

// APP CONFIG
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//MONGOOSE MODEL CONFIG
var blogSchema = new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	created:{type:Date, default:Date.now}
});
var Blog= mongoose.model("Blog",blogSchema);



// RESTful ROUTES
app.get("/",function(req,res){
	res.redirect("/blogs");
});
//INDEX Route
app.get("/blogs",function(req,res){
	Blog.find({},function(err,blogs){
		if(err){
			console.log(err);
		} else{
			res.render("index",{blogs:blogs});
		}
	})
});
//NEW Route
app.get("/blogs/new",function(req,res){
	res.render("new");
});
//CREATE Route
app.post("/blogs",function(req,res){
	//create blogs
	Blog.create(req.body.blog,function(err,newBlog){
		if(err){
			res.send("new");
		} else{
			res.redirect("/blogs");
		}
	});
});
//SHOW Route
app.get("/blogs/:id",function(req,res){
	Blog.findById(req.params.id, function(err,foundBlog){
		if(err){
			res.redirect("/blogs");
		} else{
			res.render("show",{blog:foundBlog});
		}
	});
});
//EDIT Route
app.get("/blogs/:id/edit",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			res.redirect("/blogs");
		} else{
			res.render("edit",{blog:foundBlog});
		}
	});
});
//UPDATE Route



app.listen("3000",function(){
	console.log("SERVER Was Started!!!!!");
})