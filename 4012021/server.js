var http = require("http");
var PORT = 8080;

var server = http.createServer(handleRequest);

server.listen(PORT, function() {
    console.log("server listening on: http://localhost:" + PORT);
});

function handleRequest(request, response) {
    var path = request.url;

    switch (path) {
        case "/":
            return displayRoot(path, request, response);

        case "/portfolio":
            return displayPortfolio(path, request, response);
        
        default:
            return display404(path, request, response);
    }
}

function displayRoot(url, request, response) {
    var myHTML = "<html>"+
    "<body><h1>Home Page</h1>" +
    "<a href='/portfolio'>Portfolio</a>" +
    "</body></html>";

    response.writeHead(200, { "Content-Type": "text/html"});
    response.end(myHTML);
};

function displayPortfolio(url, request, response) {
    var myHTML = "<html>" +
    "<body><h1>My Portfolio</h1>" +
    "<a href='/'>Go Home</a>" +
    "</body></html>";

    response.writeHead(200, { "Content-Type": "text/html" });

    response.end(myHTML);
};

function display404(url, request, response) {
    var myHTML = "<html>" +
    "<body><h1?>404 Not Found </h>" +
    "<p>The page you were looking for: " + url + " can not be found</p>" +
    "</body></html>";

    response.writeHead(404, { "Content-Type": "text/html" });
    response.end(myHTML);
}
