// var mysql = require("mysql");

// var connection = mysql.createConnection({
//   host: "localhost",

//   // Your port; if not 3306
//   port: 3306,

//   // Your username
//   user: "newuser",

//   // Your password
//   password: "password",
//   database: "ice_creamDB"
// });

// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId);
//   // connection.end();
//   afterConnection();
// });

// // function afterConnection() {
// //   // console.log("here");
// //   connection.query("SELECT * FROM products", function(err, res) {
// //     if (err) throw err;
// //     console.table(res);
// //     console.log("Flavor of item 0:",res[0].flavor)
// //     connection.end();
// //   });
// // }

// function afterConnection() {
//   connection.query("SELECT * FROM products", function(err, res) {
//     if (err) throw err;
//     console.table(res);
//     console.log("Flavor of item 0:",res[0].flavor)
//     connection.end();
//   });
// }

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "newuser",

  // Your password
  password: "password",
  database: "ice_creamDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("here");
  console.log("connected as id " + connection.threadId);
  
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    console.log("Flavor of item 0:",res[0].flavor)
    connection.end();
  });
}