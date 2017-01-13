var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Hangryhack      = require("./models/hangryhack"),
    seedDB          = require("./seeds");
    // Comment         = require("./models/comment"),
    // User            = require("./models/user");

mongoose.connect("mongodb://localhost/yelp_im_hangry");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();


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
            res.render("index", {hangryhacks:allHangryhacks});
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
    res.render("new");
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
            res.render("show", {hangryhack: foundHangryhack});    
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpImHangry Server Has Started!");
});