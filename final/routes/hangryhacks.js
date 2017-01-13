var express = require("express");
var router = express.Router();
var Hangryhack = require("../models/hangryhack");
var middleware = require("../middleware");

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
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newHangryhack = {name: name, image: image, description: desc, author:author};
    Hangryhack.create(newHangryhack, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/hangryhacks");
        }
    });
    
});

// New Route 
router.get("/new", middleware.isLoggedIn, function(req, res){
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

// Edit Hangryhack Route
router.get("/:id/edit", middleware.checkHangerhackOwnership, function(req, res){
    Hangryhack.findById(req.params.id, function(err, foundHangryhack){
        res.render("hangryhacks/edit", {hangryhack: foundHangryhack});
    });
});

// Update Hangryhack Route 
router.put("/:id", middleware.checkHangerhackOwnership, function(req, res){
    // find and update the correct campground
    Hangryhack.findByIdAndUpdate(req.params.id, req.body.hangryhack, function(err, updatedHangryhack){
        if(err){
            res.redirect("/hangryhacks");
        } else {
            res.redirect("/hangryhacks/" + req.params.id);
        }
    });
    // redirect somewhere (showpage)
});

// Destroy Hangryhack Route 
router.delete("/:id", middleware.checkHangerhackOwnership, function(req, res){
    Hangryhack.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/hangryhacks");
        } else {
            res.redirect("/hangryhacks");
        }
    });
});

module.exports = router;
