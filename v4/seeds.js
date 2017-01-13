var mongoose = require("mongoose");
var Hangryhack = require("./models/hangryhack");
var Comment = require("./models/comment");

var data = [
    {
        name: "Sample Data 1",
        image: "https://images.pexels.com/photos/196668/pexels-photo-196668.jpeg?h=350&auto=compress",
        description: "blah blah blah"
    },
    {
        name: "Sample Data 2",
        image: "https://images.pexels.com/photos/59016/pexels-photo-59016.jpeg?h=350&auto=compress&cs=tinysrgb",
        description: "Here is a comment I've been working on."
    },
    {
        name: "Sample Data 3",
        image: "https://images.pexels.com/photos/25273/pexels-photo-25273.jpg?h=350&auto=compress",
        description: "Here is another comment I brainstormed a lot before writing."
    }
];

function seedDB(){
    // Remove all hangryhacks
    Hangryhack.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed a hangryhack!");
       // add a few hangryhack 
        data.forEach(function(seed){
            Hangryhack.create(seed, function(err, hangryhack){
                if(err){
                    console.log(err);
                } else {
                    console.log("added hangryhacks");
                    // create a comment 
                    Comment.create(
                        {
                            text: "That is so funny",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                hangryhack.comments.push(comment);
                                hangryhack.save();
                                console.log("Created new comment");
                            }
                            
                        });
                }
            });    
        });
    });
    
}

module.exports = seedDB;

