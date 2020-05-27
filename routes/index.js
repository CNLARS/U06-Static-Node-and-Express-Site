// const express = require("express");
// const router = express.Router();
// const data = require("./data.json");
// const projects = data.projects;


// //Sets static path for routing to the "public" folder:
// router.use("/static", express.static("public"));

// //A route to RENDER "Home" page:
// router.get("/", (req, res) => {
//     res.render("index");
//     //console.log(projects[1].project_name); //Testing123
// });

// //A route to RENDER the "about" page:
// router.get("/about", (req, res) => {
//     res.render("about");
//     //console.log(projects[2].project_name); //Testing123
// });

//  /*
//     Dynamic "project" routes ("/projects:id") based on
//         the id, that renders a customized version of
//         the Pug template to highlight each project. 
        
//     +Adds data, aka "locals" => { project }, containing the
//        data to be passed in the Pug template.
// */

// router.get("/projects/:id", function(req, res, next){
//     const projectID = req.params.id;
//     const project = projects.find( ({ id }) => id === projectID)

//     if(project){
//         res.render("project", { project });
//         console.log({project})
//         console.log(project.project_name)
//     } else {
//         //Error Message:
//         //res.render("error");
//         res.sendStatus(404);
//         const err = new Error("Yikes! There's been an error: page does not exist.");
//         next(err);
//     }
    
// });

// // module.exports = router;