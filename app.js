var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");


mongoose.connect("mongodb://localhost:27017/yelp_camp_v3", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res) {
    res.render("landing.ejs");   
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render("index.ejs", {campgrounds: allCampgrounds});   
        }
    });
});

//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image:image, description:description}
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            //redirect back to campgrounds
            res.redirect("/campgrounds");   
        }
    });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show.ejs", {campground: foundCampground});   
        }
    });
});

app.listen(process.env.PORT, process.env.IP , function() {
    console.log("YelpCamp Server has started!");
});