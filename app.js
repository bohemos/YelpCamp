var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);


// Campground.create(
//     {
//         name: "Salmon Creek", 
//         image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f9c67aa1efb2b1_340.jpg",
//         description: "something something"
//         // name: "Granite Hill", 
//         // image:"https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f9c271a0ebb7bb_340.jpg",
//         // description: "something something 2"
//     }, function (err, campground){
//         if(err) {
//             console.log(err);
//         } else {
//             console.log("Created new campground");
//             console.log(campground);
//         }
// });

var campgrounds = [
        {name: "Salmon Creek", image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f9c67aa1efb2b1_340.jpg"},
        {name: "Granite Hill", image:"https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f9c67aa1efb2b1_340.jpg"},
        {name: "Mountain Goat's Rest", image:"https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f9c271a0ebb7bb_340.jpg"},
        {name: "Salmon Creek", image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f9c271a0ebb7bb_340.jpg"},
        {name: "Granite Hill", image:"https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f9c271a0ebb7bb_340.jpg"},
        {name: "Mountain Goat's Rest", image:"https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f9c271a0ebb7bb_340.jpg"},
        {name: "Salmon Creek", image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f9c271a0ebb7bb_340.jpg"},
        {name: "Granite Hill", image:"https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f9c271a0ebb7bb_340.jpg"},
        {name: "Mountain Goat's Rest", image:"https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f9c271a0ebb7bb_340.jpg"},
        {name: "Salmon Creek", image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f9c271a0ebb7bb_340.jpg"},
        {name: "Granite Hill", image:"https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f9c271a0ebb7bb_340.jpg"},
        {name: "Mountain Goat's Rest", image:"https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f9c271a0ebb7bb_340.jpg"}
    ];


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
    Campground.findById(req.params.id, function(err, foundCampground){
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