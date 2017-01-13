var express = require("express");
var router = express.Router({mergeParams:true});
var Hangryhack = require("../models/hangryhack");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// Comments New 
router.get("/new", middleware.isLoggedIn, function(req, res){
    Hangryhack.findById(req.params.id, function(err, hangryhack){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {hangryhack: hangryhack});
        }
    });
     
});

// Comments Create 
router.post("/", middleware.isLoggedIn, function(req, res){
    Hangryhack.findById(req.params.id, function(err, hangryhack){
        if(err){
            console.log(err);
            res.redirect("/hangryhacks");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment 
                    comment.save();
                    hangryhack.comments.push(comment);
                    hangryhack.save();
                    req.flash("success", "Added comment");
                    res.redirect("/hangryhacks/" + hangryhack._id);
                }
            });
        }
    });   
});

// Comments Edit Route 
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {hangryhack_id: req.params.id, comment: foundComment});
        }
    });
});

// Comments Update Route 
router.put("/:comment_id",middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/hangryhacks/" + req.params.id );
        }
    });
});

// Comment Destroy Route 
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/hangryhacks/" + req.params.id);
        }
    });
});

module.exports = router;