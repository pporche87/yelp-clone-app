var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// Root Route 
router.get("/", function(req, res){
    res.render("landing");
});

// Show Register Form 
router.get("/register", function(req, res){
    res.render("register");
});

// Handle Sign-up Logic Route 
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/hangryhacks");
        });
    });
});

// Show Login Form Route
router.get("/login", function(req, res){
    res.render("login");
});

// Handle Login Form Route 
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/hangryhacks",
        failureRedirect: "/login"
    }), function(req, res){
    
});

// Logout Route 
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/hangryhacks");
});

// Middleware 
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;