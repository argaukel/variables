var express = require("express");
var app = express();
var PORT = 3000;

var yoda = {
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
};

var darthmaul = {
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
};

app.get("/", function(request, response) {
    response.send("Welcome to the Star Wars Page!")
});

app.get("/yoda", function(request, response) {
    response.json(yoda);
});

app.get("/darthmaul", function(request, response) {
    response.json(darthmaul);
});