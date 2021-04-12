var mysql = require("mysql");

var connection = mysql.createConnection({
    port: 3306,
    user: "newuser",
    password: "password",
    database: "playlist_db"
});

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;