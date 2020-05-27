//const http = require("http");
const express = require("express");
const app = express();
const data = require("./data.json");
const bodyParser = require("body-parser");
const projects = data.projects;
//const indexRouter = require('./routes/index');

app.use(bodyParser.urlencoded( {extended: false} ) );


//const citadelView = require("./views");
//const aboutView = require(".views/about");
//const indexView = require(".views/index");
//const projectView = require(".views/project");

//Sets the view engine to pug to use pug templates
app.set("view engine", "pug");
//app.use("/", indexRouter);

//Sets static path for routing to the "public" folder:
app.use("/static", express.static("public"));

//A route to RENDER "Home" page:
app.get("/", (req, res) => {
    res.render("index");
    //console.log(projects[1].project_name); //Testing123
});

//A route to RENDER the "about" page:
app.get("/about", (req, res) => {
    res.render("about");
    //console.log(projects[2].project_name); //Testing123
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
        console.log({project})
        console.log(project.project_name)
    } else {
        err.status = 404;
        res.render("error");
        const err = new Error("Yikes! There's been an error: page does not exist.");
        next(err);
    }
    
});

//Error Message:
app.use( (err, req, res, next) => {
    err.status = 404;
    err.message = new Error("😱 Zoinks!");
    res.locals.message = err.message;
    res.render("error", err);
});


const localNum = 3000; //Not associated with Hal 3000
app.listen(localNum, () => {
    console.log(`Brought to you by LocalHost: ${localNum}`);
});