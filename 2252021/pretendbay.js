const mysql = require("mysql");
const inquirer  = require("inquirer");

var connection = mysql.createConnection ({
    port: 3306,
    user: "newuser",
    password: "password",
    database: "bay_db"
});

function runPostItem() {
    inquirer.prompt(newItem).then(answers => {
        console.log(answers);
    })
    connection.end();
}

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    runPostItem();
});

var newItem = [
    {
        type: 'input',
        name: 'item',
        message: 'What is the item?',
        validate: function (value) {
            if (value == "") {
                console.log("please make a selection")
            } else {
                return true;
            }
        }
    },
    {
        type: 'list',
        name: 'category',
        message: 'What is the category?',
        choices: [
            "Electronics",
            "Books",
            "Clothes",
        ]
    },
    {
        type: 'input',
        name: 'staring price',
        message: 'What is your starting price?',
        validate: function (value) {
            if (value == "") {
                console.log("Please make a selection")
            } else {
                return true;
            }
        }
    },
    
]