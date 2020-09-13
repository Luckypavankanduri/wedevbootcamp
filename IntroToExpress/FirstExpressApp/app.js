var express=require("express");
var app = express();

// "/" => Hi There
app.get("/",function(request,respond){
	respond.send("Hi There!!");
});

app.get("/bye",function(req,res){
	res.send("GoodBye!!");
});

app.get("/cat",function(req,res){
	res.send("MEOW!!");
	
});



// Tell Express to listen for requests
app.listen(3000,function(){
	console.log("server listening on Port 3000");
});