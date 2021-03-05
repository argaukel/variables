const mysql = require("mysql");
const inquirer  = require("inquirer");

var connection = mysql.createConnection ({
    port: 3306,
    user: "newuser",
    password: "password",
    database: "bay_db"
});

function endConnection() {
    connection.end();
}

function queryAllItems() {
    connection.query("SELECT * FROM bay", function(err, res) {
        if (err) throw err;
        console.table(res);
    })

}

function listItems() {
    connection.query("SELECT * FROM bay", function(err, res) {
        if (err) throw err;
        // console.log(res.map(bay => bay.item_name));
        inquirer.prompt([
            {
                name: "selectItem",
                message: "here's everything",
                type: "list",
                choices: res.map(bay => bay.item_name)
            },
            {
                name: "bid",
                message: "What is your bid?"
            }
        ])
        .then(answers => {
            console.log(answers.selectItem + " & " + answers.bid);
            
            
        })


    })
    endConnection();
}

function runPostItem() {
    inquirer.prompt(newItem).then(answers => {
        console.log(answers);
        // console.log(answers.starting_price)
        newItemUpdate(answers.item, answers.category, answers.starting_price);
    })
    // connection.end();
}

function newItemUpdate(item, category, starting_price) {
    console.log(item + " " + category + " " + starting_price);
    var insertQuery = connection.query(
        "INSERT INTO bay SET ?",
        {
            item_name: item,
            category: category,
            starting_bid: starting_price,
        },
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " was added!\n");
        });
        console.log(insertQuery.sql);
        queryAllItems();
        endConnection();
}

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // runPostItem();
    // queryAllItems();
    listItems();
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
        name: 'starting_price',
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