var express = require("express");
var app = express();

var request = require("request");

app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("search");
});


app.get("/results",function(req,res){
	var movie=req.query.movie;
	var url="http://www.omdbapi.com/?s=" + movie +"&apikey=16ebcba6"
	
	request(url,function(error,response,body){
		if(!error && response.statusCode==200){
			var data=JSON.parse(body);
			var thing=data["Search"];
			res.render("result",{thing:thing});
		}
	});
	
});

app.listen("3000",function(){
	console.log("Movie App was Started");
});