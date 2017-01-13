var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Hangryhack      = require("./models/hangryhack"),
    Comment         = require("./models/comment"),
    seedDB          = require("./seeds"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user");

mongoose.connect("mongodb://localhost/yelp_im_hangry");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
seedDB();

// PASSPORT CONFIGURATION 
app.use(require("express-session")({
    secret: "This app is satire!",
    resave: false, 
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


app.get("/", function(req, res){
    res.render("landing");
});

// INDEX - Show all hangryhacks 
app.get("/hangryhacks", function(req, res){
    // Get all campgrounds from DB
    Hangryhack.find({}, function(err, allHangryhacks){
        if(err){
            console.log(err);
        } else {
            res.render("hangryhacks/index", {hangryhacks:allHangryhacks, currentUser: req.user});
        }
    });
});

// CREATE - add new hangryhacks to db
app.post("/hangryhacks", function(req, res){
    // get data from form and add to the hangryhacks array 
     var name = req.body.name;
     var image = req.body.image;
     var desc = req.body.description;
     var newHangryhack = {name: name, image: image, description: desc};
    //  Create a new campground and save to DB
    Hangryhack.create(newHangryhack, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect back to the hangryhacks array 
            res.redirect("/hangryhacks");
        }
    });
    
});

// NEW - show form to create a new hangryhack
app.get("/hangryhacks/new", function(req, res){
    res.render("hangryhacks/new");
});

// SHOW - shows more info about one hangryhack
app.get("/hangryhacks/:id", function(req, res){
    // find the hangryhack with provided ID
    Hangryhack.findById(req.params.id).populate("comments").exec(function(err, foundHangryhack){
       if(err){
            console.log(err);
       } else {
           console.log(foundHangryhack);
            // render show template with that campground 
            res.render("hangryhacks/show", {hangryhack: foundHangryhack});    
       }
    });
});

// =================================
// COMMENTS ROUTES
// =================================

app.get("/hangryhacks/:id/comments/new", isLoggedIn, function(req, res){
    // find hangryhacks by id
    Hangryhack.findById(req.params.id, function(err, hangryhack){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {hangryhack: hangryhack});
        }
    });
     
});

app.post("/hangryhacks/:id/comments", isLoggedIn, function(req, res){
    // lookup hangryhack using ID
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
    // create new comment 
    // connect new comment to hangryhack
    // redirect hangryhack show page 

});

// ==============
// AUTH ROUTES 
// ==============

// show register form 
app.get("/register", function(req, res){
    res.render("register");
});
// handle sign up logic 
app.post("/register", function(req, res){
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

// show login form 
app.get("/login", function(req, res){
    res.render("login");
});
// handle login logic 
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/hangryhacks",
        failureRedirect: "/login"
    }), function(req, res){
    
});

// logout route 
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/hangryhacks");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpImHangry Server Has Started!");
});