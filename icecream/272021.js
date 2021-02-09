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
  console.log("connected as id " + connection.threadId);
  // connection.end();
  afterConnection();
});

function afterConnection() {
  connection.query("select * from products", function(err, res) {
    if (err) throw err;
    var length = Object.keys(res).length;
    console.log(length);
    console.table(res);
    // console.log(res[1].flavor);
    console.log("Flavor of item 0:",res[0].flavor);
    // console.log(res);
    for (var i = 0; i < length; i++){
      console.log("Flavor of item ", i,": ", res[i].flavor)
    };
    connection.end();
  });
}