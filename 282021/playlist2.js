var mysql = require("mysql");

var connection = mysql.createConnection ({
port: 3306,
user: "newuser",
password: "password",
database: "playlist_db"

});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // updateSongDynamic("Breakfast tea", "Eli Way");
    queryAllSongs();
    // queryByGenre("lofi");
    // updateSongs();
    connection.end();
});

function queryAllSongs() {
    connection.query("SELECT * FROM songs", function(err, res) {
        if (err) throw err;
        console.table(res);
    })
}

function queryByGenre(genre) {
    var query = connection.query("SELECT * FROM songs WHERE genre = ?", [genre], function(err, res) {
        if (err) throw err;
        console.table(res)
    });
    console.log(query.sql);
}

function updateSongDynamic(title, artist) {
    var updateQuery = connection.query(
        "UPDATE songs SET ? WHERE ?",
        [
            {
                title: title,
            },
            {
                artist: artist,
            }
        ],
        function(err, res) {
                if (err) throw err,
                console.log(res.affectedRows + " products updated!\n");
        }
    );
    console.log(updateQuery.sql);
}

function updateSongs() {
    var update = connection.query(
        "UPDATE songs SET ? WHERE ?",
        [
            {
                title: "Black Tea"
            },
            {
                artist: "Eli Way"
            }
        ],
        function(err, res) {
            console.log(res.affectedRows + " products updated!\n");
        });
        console.log(update.sql);
}
