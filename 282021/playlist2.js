var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection ({
port: 3306,
user: "newuser",
password: "password",
database: "playlist_db"

});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // insertSongDynamic("Sleepy Vibes", "The Deli", "lofi");
    // updateSongDynamic("Redberry tea", "Eli Way");
    // queryAllSongs();
    // queryByGenre("lofi");
    // updateSongs();
    // insertSong();
    // deleteSongDynamic(5);
    // inquiry();
    connection.end();
});

// function inquiry() {
    // var inquiry = inquirer
    // .prompt([
    //     {
    //         type: 'checkbox',
    //         message: 'Select Genre',
    //         name: 'Genre',
    //         choices: [
    //             new inquirer.Separator(' The Genres '),
    //             {
    //               name: 'lofi',  
    //             },
    //             {
    //                 name: "Chillhop",
    //             },
    //         ],
    //         validate: function (answer) {
    //             if (answer.length < 1) {
    //                 return 'You gotta choose!';
    //             }

    //             return true;
    //         },
    //     },
    // ])
    // .then((answers) => {
    //     console.log(JSON.stringify(answers, null, '  '));
    // });
//         console.log(inquiry);
// }

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
};

function insertSong() {
    var insertSongQuery = connection.query(
        "INSERT INTO songs SET ?",
        {
            title: "Dreamscape",
            artist: "deadxbeat",
            genre: "chillhop"
        },
        function(err, res) {
            if (err) throw err;
            console.table(res);
            console.log(res.affectedRows + " product inserted!\n");
        }
    );
    console.log(insertSongQuery.sql);
};

function deleteSongDynamic(id) {
    var deleteQuery = connection.query(
        "DELETE FROM songs WHERE ?",
        {
            id: id,
        },
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products deleted!\n");
        }
    );
    console.log(deleteQuery.sql);
};

function insertSongDynamic(title, artist, genre) {
    var insertQuery = connection.query(
        "INSERT INTO songs SET ?",
            {
                title: title,
                artist: artist,
                genre: genre,
            },
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");
        });
    console.log(insertQuery.sql);
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
                if (err) throw err;
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
