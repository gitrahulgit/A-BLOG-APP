//===INITIALIZING SETUPS===//
var express = require("express");
app = express();
mongoose = require("mongoose");
var bodyParser = require("body-parser");
mongoose.connect("mongodb://localhost/restful_blog_app");
methodOverride = require("method-override");
expressSanitizer = require("express-sanitizer");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
//sending static html files
// app.use(express.static(path.join(__dirname, "public")));
// var path = require("path");




//===MONGOOSE MODEL CONFIGURATIONS===//
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

var Blog = mongoose.
model("Blog", blogSchema);

//creating a blog
// Blog.create({
//     title: "dog",
//     image: "https://images.unsplash.com/photo-1518155317743-a8ff43ea6a5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     body: "HELLO THIS IS A BLOG POST"
// });
//===RESTFUL ROUTES===//


app.get("/", function(req, res) {
    res.redirect("/blogs");

});


app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log(err);


        } else {
            res.render("index", { blogs: blogs });
        }
    });


});

app.get("/blogs/new", function(req, res) {
    res.render("new");
});
///////////////////////////////////////////////////////////////////////changes
app.post("/blogs", function(req, res) {
    //create blog 
    // console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body);
    // console.log("===============================");

    Blog.create(req.body.blog, function(err, newBlog) {
        if (err) {
            res.render("new");
        } else {
            //then redirect to blogs
            res.redirect("/blogs");
        }
    })
});

// show route
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show", { blog: foundBlog });
        }

    })

});

//edit route
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect("/blogs");


        } else {
            res.render("edit", { blog: foundBlog });
        }
    });



});



app.put("/blogs/:id/", function(req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if (err) {
            re.redirect("/blogs");

        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
});


//DELETE ROUTE

app.delete("/blogs/:id", function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/blogs");

        } else {
            res.redirect("/blogs");
        }
    })

});


// app.get("/MyPortfoilo/index.html", function(req, res) {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });














app.listen(9000, function(req, res) {
    console.log("i am on");

});