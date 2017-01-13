var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Hangryhack      = require("./models/hangryhack"),
    flash           = require("connect-flash"),
    methodOverride  = require("method-override"),
    Comment         = require("./models/comment"),
    seedDB          = require("./seeds"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user");
 
// Requiring Routes 
var commentRoutes       = require("./routes/comments"),
    hangryhacksRoutes   = require("./routes/hangryhacks"),
    indexRoutes         = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_im_hangry";

mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
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
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/hangryhacks/:id/comments",commentRoutes);
app.use("/hangryhacks", hangryhacksRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpImHangry Server Has Started!");
});