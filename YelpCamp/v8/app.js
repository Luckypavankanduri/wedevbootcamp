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

// Requiring Routes
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");

// App Configuration
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

// Passport Configuration
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

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen("3000",function(){
	console.log(" The Yelp CampServer Was started!!!");
});