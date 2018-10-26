var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {   
        name:"Cloud's Rest", 
        image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f9c67aa1efb2b1_340.jpg",
        description: "some test"
    },
    {   
        name:"Cloud's Rest", 
        image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f9c978a4eeb1bb_340.jpg",
        description: "some test"
    },
    {   
        name:"Cloud's Rest", 
        image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f9c978a4eeb1bb_340.jpg",
        description: "some test"
    }
]

function seedDB () {
    //Remove all campgrounds
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Removed all campgrounds");
            //add a few campgrounds
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text:"This place is great!",
                                author: "Homer"
                            }, function(err, comment) {
                                if(err) {
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("created new comment");
                                }
                            });
                    }
                });  
            });
        }
    });
    //add a few campgrounds
}

module.exports = seedDB;