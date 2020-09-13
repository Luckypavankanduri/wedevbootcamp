const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/team_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

var teamSchema = new mongoose.Schema({
	name: String,
	titles:Number,
	captain:String
});

var Team = mongoose.model("Team",teamSchema);

// ADD Team to DB

Team.create({
	name:"Rajasthan Royals",
	titles:1,
	captain:"Steve Smith"
},function(err,team){
	if(err){
		console.log(err);
	} else{
		console.log(team);
	}
});

// Retrive Teams from DataBase

Team.find({},function(err,teams){
	if(err){
		console.log("404 Not Found")
	} else{
		console.log("ALL Teams ............");
		console.log(teams);

	}
});

Team.remove({name:"Kolkata Knight Riders"})