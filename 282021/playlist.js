var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "newuser",
    password: "password",
    database: "playlist_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection1("Guggenz");
    afterConnection1("Eli Way");
    connection.end();
    // afterConnection();
})
function afterConnection1(artist) {
    var query = connection.query("SELECT * FROM songs where artist = ?", [artist], function(err, res) {
        console.table(res);
    });

    console.log(query.sql);
    // connection.end();
}
function afterConnection() {
    connection.query("SELECT * FROM songs", function(err, res) {
        if (err) throw err;
        // console.log(res);
        console.table(res);
    });
    connection.query("SELECT * FROM songs WHERE genre = 'lofi'", function(err, res) {
        if (err) throw err;
        console.table(res);
    });
    connection.query("SELECT * FROM songs WHERE artist = ?", ['DRWN.'], function(err, res) {
        if (err) throw err;
        console.table(res);
    });
    connection.query({
        sql: 'SELECT * FROM songs WHERE artist = ?',
        timeout: 40000,
        values: ['iamalex']
    }, function (err, res) {
        console.table(res);
    })
    connection.end();
}