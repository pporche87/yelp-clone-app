var mongoose = require("mongoose");
var Hangryhack = require("./models/hangryhack");
var Comment = require("./models/comment");

var data = [
    {
        name: "Sample Data 1",
        image: "https://images.pexels.com/photos/196668/pexels-photo-196668.jpeg?h=350&auto=compress",
        description: "Activated charcoal stumptown blue bottle microdosing. Echo park cronut messenger bag austin, asymmetrical everyday carry air plant health goth edison bulb affogato vape plaid banh mi. Tbh bushwick cardigan, raclette pabst hashtag fap shoreditch paleo locavore lo-fi flexitarian migas. Stumptown +1 flexitarian, umami cliche shabby chic aesthetic intelligentsia snackwave blog letterpress venmo gluten-free sartorial."
    },
    {
        name: "Sample Data 2",
        image: "https://images.pexels.com/photos/59016/pexels-photo-59016.jpeg?h=350&auto=compress&cs=tinysrgb",
        description: "Activated charcoal stumptown blue bottle microdosing. Echo park cronut messenger bag austin, asymmetrical everyday carry air plant health goth edison bulb affogato vape plaid banh mi. Tbh bushwick cardigan, raclette pabst hashtag fap shoreditch paleo locavore lo-fi flexitarian migas. Stumptown +1 flexitarian, umami cliche shabby chic aesthetic intelligentsia snackwave blog letterpress venmo gluten-free sartorial."
    },
    {
        name: "Sample Data 3",
        image: "https://images.pexels.com/photos/25273/pexels-photo-25273.jpg?h=350&auto=compress",
        description: "Activated charcoal stumptown blue bottle microdosing. Echo park cronut messenger bag austin, asymmetrical everyday carry air plant health goth edison bulb affogato vape plaid banh mi. Tbh bushwick cardigan, raclette pabst hashtag fap shoreditch paleo locavore lo-fi flexitarian migas. Stumptown +1 flexitarian, umami cliche shabby chic aesthetic intelligentsia snackwave blog letterpress venmo gluten-free sartorial."
    },
    {
        name: "Sample Data 4",
        image: "https://images.pexels.com/photos/2215/food-salad-healthy-vegetables.jpg?h=350&auto=compress",
        description: "Activated charcoal stumptown blue bottle microdosing. Echo park cronut messenger bag austin, asymmetrical everyday carry air plant health goth edison bulb affogato vape plaid banh mi. Tbh bushwick cardigan, raclette pabst hashtag fap shoreditch paleo locavore lo-fi flexitarian migas. Stumptown +1 flexitarian, umami cliche shabby chic aesthetic intelligentsia snackwave blog letterpress venmo gluten-free sartorial."
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

