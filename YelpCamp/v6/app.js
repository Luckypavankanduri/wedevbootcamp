// Require Modules
var express               =require("express");
var app                   =express();
var bodyParser            =require("body-parser");
var passport              =require("passport");
var LocalStrategy         =require("passport-local");

var Campground            =require("./models/campground");
var Comment               =require("./models/comment");
var User                  =require("./models/user");
var seedDB                =require("./seeds");

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
app.use(express.static(__dirname+"/public"));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});

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
			res.render("campgrounds/index",{campgrounds:allcampgrounds, currentUser:req.user});
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
	res.render("campgrounds/new");
});
// SHOW Route
app.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		} else{
			res.render("campgrounds/show",{campground:foundCampground});
		}
	})
});


//=================================================
// COMMENTS ROUTES
//=================================================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		} else{
			res.render("comments/new",{campground:campground});
		}
	});
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				} else{
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});


//============================================
// AUTH Routes
//==========================================
app.get("/register", function(req, res){
   res.render("register"); 
});
//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds"); 
        });
    });
});

// show login form
app.get("/login", function(req,res){
	res.render("login");
});
//handling login logic 
app.post("/login", passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}),function(req,res){
});

// LOGOUT ROUTES
app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
app.listen("3000",function(){
	console.log(" The Yelp CampServer Was started!!!");
});