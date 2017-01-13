var Hangryhack = require("../models/hangryhack");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkHangerhackOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Hangryhack.findById(req.params.id, function(err, foundHangryhack){
            if(err){
                res.redirect("back");
            } else {
                // does user own the campground?
                if(foundHangryhack.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership= function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                // does user own the comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = middlewareObj;