//const http = require("http");
const express = require("express");
const app = express();
const data = require("./data.json");
const bodyParser = require("body-parser");
const projects = data.projects;
const localNum = 3000;

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
        
    if(!project){
        const err = new Error();
        err.status = "404 👻";
        err.message = `😱 Zoinks! "/projects/${projectID}" is a g-g-ghost!`;
        next(err);
    }

    res.render("project", { project });
});

app.use( (req, res, next) =>{
    const err = new Error();
    err.status = 404;
    err.message = "🕵🏾‍♀️ Jinkies! There appears to be an error with the requested page: In this instance of time and space this page is a mystery.";
    next(err);
});

//Error Middleware:
app.use( (err, req, res, next) => {
    res.locals.error = err;
    res.locals.status = (err.status || 500);
    res.locals.message = err.message;
    res.locals.stack = err.stack;

    res.render("error");
});


app.listen(localNum, () => {
    console.log(`Brought to you by LocalHost: ${localNum}`);
});