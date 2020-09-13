const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog_demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

var Post=require("./models/post")

//User => name & email
var userSchema = new mongoose.Schema({
	email:String,
	name:String,
	posts:[Post]
});
var User = mongoose.model("User",userSchema);


/*var newuser= new User({
	email:"patrickbrown@ecb.co.in",
	name:"Patrick Brown"
});
newuser.posts.push({
	title:"DFDFDSFDSFDSAFDZFDSFDF",
	content:"Unknown Title"
});
newuser.save(function(err,user){
	if(err){
		console.log(err);
	} else{
		console.log(user);
	}
});*/

/*var newpost= new Post({
	title:"patrickbrown@ecb.co.in",
	content:"Patrick Brown"
});
newpost.save(function(err,post){
	if(err){
		console.log(err);
	} else{
		console.log(post);
	}
});*/

User.findOne({},function(err,user){
	if(err){
		console.log(err);
	} else{
		
		user.posts.push({
			title:"safadcdfzvdsvzxv",
			content:"Anosdfdsgfsdfdsfdsfdsfew Unknown Title"
		});
		user.save(function(err,user){
			if(err){
				console.log(err);
			} else{
				console.log(user);
			}
		})
	}
});