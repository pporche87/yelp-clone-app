var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var hangryhacks = [
    {name: "Easy Oven Fried Chicken", image: "https://images.pexels.com/photos/5876/food-salad-healthy-vegetables.jpg?h=350&auto=compress"},
    {name: "Delicious Brunch Sandwhich", image: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?h=350&auto=compress&cs=tinysrgb"},
    {name: "Tomato Pasta Salad", image: "https://images.pexels.com/photos/3329/food-kitchen-cutting-board-cooking.jpg?h=350&auto=compress"},
    {name: "Easy Oven Fried Chicken", image: "https://images.pexels.com/photos/5876/food-salad-healthy-vegetables.jpg?h=350&auto=compress"},
    {name: "Delicious Brunch Sandwhich", image: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?h=350&auto=compress&cs=tinysrgb"},
    {name: "Tomato Pasta Salad", image: "https://images.pexels.com/photos/3329/food-kitchen-cutting-board-cooking.jpg?h=350&auto=compress"},
    {name: "Easy Oven Fried Chicken", image: "https://images.pexels.com/photos/5876/food-salad-healthy-vegetables.jpg?h=350&auto=compress"},
    {name: "Delicious Brunch Sandwhich", image: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?h=350&auto=compress&cs=tinysrgb"},
    {name: "Tomato Pasta Salad", image: "https://images.pexels.com/photos/3329/food-kitchen-cutting-board-cooking.jpg?h=350&auto=compress"}
];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/hangryhacks", function(req, res){
    res.render("hangryhacks", {hangryhacks:hangryhacks});
});

app.post("/hangryhacks", function(req, res){
    // get data from form and add to the hangryhacks array 
     var name = req.body.name;
     var image = req.body.image;
     var newHangryhack = {name: name, image: image}
     hangryhacks.push(newHangryhack);
    // redirect back to the hangryhacks array 
    res.redirect("/hangryhacks");
});

app.get("/hangryhacks/new", function(req, res){
    res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpImHangry Server Has Started!");
});