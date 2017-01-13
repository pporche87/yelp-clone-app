var express = require("express");
var router = express.Router();
var Hangryhack = require("../models/hangryhack");

// Index Route
router.get("/", function(req, res){
    Hangryhack.find({}, function(err, allHangryhacks){
        if(err){
            console.log(err);
        } else {
            res.render("hangryhacks/index", {hangryhacks:allHangryhacks, currentUser: req.user});
        }
    });
});

// Create Route 
router.post("/", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newHangryhack = {name: name, image: image, description: desc};
    Hangryhack.create(newHangryhack, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/hangryhacks");
        }
    });
    
});

// New Route 
router.get("/new", function(req, res){
    res.render("hangryhacks/new");
});

// Show Route 
router.get("/:id", function(req, res){
    Hangryhack.findById(req.params.id).populate("comments").exec(function(err, foundHangryhack){
       if(err){
            console.log(err);
       } else {
            console.log(foundHangryhack);
            res.render("hangryhacks/show", {hangryhack: foundHangryhack});    
       }
    });
});

module.exports = router;
