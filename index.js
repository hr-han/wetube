//const express = require("express");
import express from "express";
import logger from "morgan";
const app = express();
const PORT = 4000;

const handleListening = () => {
    console.log(`Listening on: http://localhost:${PORT}`);
}

const handleHome = (req, res) => res.send("Hi from Home");
const handleProfile = (req, res) => res.send("You are on my profile");
const betweenHome = (req, res, next) =>{
    console.log("I'm between");
    next();
};

app.use(logger("tiny"));

app.get("/", handleHome);

app.get("/profile", handleProfile)

app.listen(PORT, handleListening);

// import express from "express";

// const app = express();

// const handleHome = (req, res) => res.send("Home.");
// const handleAboutUs = (req, res) => res.send("About Us.");
// const handleContact = (req, res) => res.send("Contact.");
// const handleProtected = (req, res) => res.send("Protected.");

// //const handleProtected = (req, res) => res.send("Protected.");
// const prehandleProtected = (req, res) => {
//   //app.get("/", handleHome);
//   res.redirect("/");
// };
// const between = (req, res, next) => {
//   console.log("I'm a middleware");
//   next();
// };

// app.use(between);

// app.get("/", handleHome);
// app.get("/about-us", handleAboutUs);
// app.get("/contact", handleContact);
// app.get("/protected", prehandleProtected, handleProtected);

// // Codesanbox does not need PORT :)
// app.listen(3000, console.log(`Listening!`));


