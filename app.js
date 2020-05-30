//const http = require("http");
const express = require("express");
const app = express();
const data = require("./data.json");
const bodyParser = require("body-parser");
const projects = data.projects;
const localNum = 3000; //Not associated with Hal 3000

app.use(bodyParser.urlencoded( {extended: false} ) );

//Sets the view engine to pug to use pug templates
app.set("view engine", "pug");

//Sets static path for routing to the "public" folder:
app.use("/static", express.static("public"));

//A route to RENDER "Home" page:
app.get("/", (req, res) => {
    res.render("index", data);
});

//A route to RENDER the "about" page:
app.get("/about", (req, res) => {
    res.render("about");
});

 /*
    Dynamic "project" routes ("/projects:id") based on
        the id, that renders a customized version of
        the Pug template to highlight each project. 
        
    +Adds data, aka "locals" => { project }, containing the
       data to be passed in the Pug template.
*/

app.get("/projects/:id", function(req, res, next){
    const projectID = req.params.id;
    const project = projects.find( ({ id }) => id === projectID)

    if(project){
        res.render("project", { project });
    } else {
        const err = new Error();
        err.status = 404;
        err.message = `Yikes! There's been an error: "projects/${projectID}" does not yet exist.`
        res.render("error", err);
        next(err);
    }
    
});

//Error Message:
app.use( (err, req, res, next) => {
    res.locals.error = err;
    res.status = (err.status || 500);
    res.message = (err.message || "🕵🏾‍♀️ Jinkies! There appears to be an error with the requested page.");
    res.stack = new Error().stack;
    res.render("error", err);
    throw new Error("😱 Zoinks!");
});


app.listen(localNum, () => {
    console.log(`Brought to you by LocalHost: ${localNum}`);
});