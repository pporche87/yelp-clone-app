var express = require("express");
var router = express.Router({mergeParams:true});
var Hangryhack = require("../models/hangryhack");
var Comment = require("../models/comment");

// Comments New 
router.get("/new", isLoggedIn, function(req, res){
    Hangryhack.findById(req.params.id, function(err, hangryhack){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {hangryhack: hangryhack});
        }
    });
     
});

// Comments Create 
router.post("/", isLoggedIn, function(req, res){
    Hangryhack.findById(req.params.id, function(err, hangryhack){
        if(err){
            console.log(err);
            res.redirect("/hangryhacks");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    hangryhack.comments.push(comment);
                    hangryhack.save();
                    res.redirect("/hangryhacks/" + hangryhack._id);
                }
            });
        }
    });   
});

// Middleware 
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;