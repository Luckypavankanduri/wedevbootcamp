var express=require("express");
var app=express();

app.use(express.static("public"));
app.set("view engine","ejs");
app.get("/",function(req,res){
	res.render("home");
});

app.get("/fallinlove/:shot",function(req,res){
	var thingVar = req.params.shot;
	res.render("shot",{shot:thingVar});
});

app.get("/posts",function(req,res){
	var shots =[
		{name:"Virat Kohli", shot:"Cover Drive"},
		{name:"Rohit Sharma", shot:"Pull Shot"},
		{name:"Glenn Maxwell", shot:"Switch Hit"}
	]
	res.render("shots",{shots:shots});
});


app.listen("3000",function(){
	console.log("Now server has listening!!!!");
});