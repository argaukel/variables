var http = require("http");
var fs = require("fs");

var PORT = 8080;

var server = http.createServer(handleRequest);

function handleRequest(request, response) {
    fs.readFile(__dirname + "/index.html", function(error, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(data);
    });
}

server.listen(PORT, function() {
    console.log("Server is listening on PORT: " + PORT);
})