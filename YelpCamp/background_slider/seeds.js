var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")
var data = [
	{
		name:"Hill Camp",
		image:"https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e5074407c2b7fdd9548cc_340.jpg",
		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "
	},
	{
		name:"Lake Camp",
		image:"https://images.pexels.com/photos/756780/pexels-photo-756780.jpeg?auto=compress&cs=tinysrgb&h=350",
		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "
	},
	{
		name:"Forest Camp",
		image:"https://images.pexels.com/photos/1723722/pexels-photo-1723722.jpeg?auto=compress&cs=tinysrgb&h=350",
		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "
	}
]

function seedDB(){
	Campground.deleteMany({},function(err){
		if(err){
			console.log(err);
		} else{
			console.log("Remove all Campgrounds");
			// Add Campgrounds
			data.forEach(function(seed){
				Campground.create(seed,function(err,campground){
					if(err){
						console.log(err);
					} else{
						console.log("Campground was Added!!");
						// Create a Comment
						Comment.create({
							text:"This Place was Awesome",
							author:"Pavan"
						}, function(err,comment){
							if(err){
								console.log(err);
							} else{
								campground.comments.push(comment);
								campground.save();
								console.log("Created New Comment");
							}
						});
					}
				});
			});
		}
	});
}
module.exports=seedDB;