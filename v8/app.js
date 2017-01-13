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
 
// Requiring Routes 
var commentRoutes       = require("./routes/comments"),
    hangryhacksRoutes   = require("./routes/hangryhacks"),
    indexRoutes         = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_im_hangry");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
// seedDB(); //seed the database

app.use(require("express-session")({
    secret: "This app is satire!",
    resave: false, 
    saveUninitialized: false
}));

// Passport Configuration 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/hangryhacks/:id/comments",commentRoutes);
app.use("/hangryhacks", hangryhacksRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpImHangry Server Has Started!");
});