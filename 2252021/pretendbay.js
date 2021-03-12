const mysql = require("mysql");
const inquirer  = require("inquirer");

var userName = "";
var connection = mysql.createConnection ({
    port: 3306,
    user: "newuser",
    password: "password",
    database: "bay_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // runPostItem();
    // queryAllItems();
    // updateItem()
    login();
    // listItems();
    // endConnection();
});

function login() {
    inquirer.prompt 
        (
            [
                {
                    name: "userName",
                    message: "User Name"
                },
                {
                    name: "password",
                    message: "Password",
                    type: "password"
                }   
            ]
        ).then(answers => {
            console.log(answers);
            userName = answers.userName
            buyOrSell();
        })
};

function buyOrSell() {
    inquirer.prompt
    (
        [
            {
                message: "Are you buying or selling?",
                name: "buyorsell",
                type: "list",
                choices: 
                [
                    "BUY",
                    "SELL"
                ]
            }
        ]
    ).then(answers => {
        console.log(answers);
        if (answers.buyorsell == "SELL") {
            console.log("sell");
            runPostItem();
            // endConnection();
        } else {
            console.log("buy");
            endConnection();
        }
        
    })
}

function endConnection() {
    console.log("end connection")
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
            // console.log(res);
            var itemBidOn = res.find(bay => bay.item_name == answers.selectItem);
            // console.log(itemBidOn)
            console.log(itemBidOn.starting_bid);
            console.log(answers.bid);
            if (itemBidOn.starting_bid >= answers.bid) {
                console.log("You're not the highest bidder")
            } else {
                console.log(itemBidOn.id);
                console.log(answers.bid);
                // var updatePrice = 
                connection.query("UPDATE bay SET ? WHERE ?", 
                [
                    {
                        highest_bid: answers.bid,
                    },
                    {
                        id: itemBidOn.id,
                        
                    },
                ], (err, res) => {
                    console.log("New highest bid!")
                    console.log(res)
                    endConnection();
                    console.log("hit!")
                })
                // console.log(updatePrice.sql);
            }
            
        })


    })
    // endConnection();
    
}


function runPostItem() {
    connection.query("SELECT * FROM bay WHERE ?", [{
        creator: userName
    }], (err, res) => {
        console.log("userName " + userName);
        console.table(res);
        inquirer.prompt
        (
            {
                name: "action",
                message: "What's on the agenda?",
                type: "list",
                choices:
                [
                    "New Item", "Edit Current Item", "Close Bidding"
                ]
            }
        ).then(answers => {
            if (answers.action == "New Item") {
              inquirer.prompt(newItem).then(answers => {
                answers.creator = userName;     
                console.log(answers);
                // console.log(answers.starting_price)
                newItemUpdate(answers.item, answers.category, answers.starting_price, answers.creator);
            });  
            } else if (answers.action == "Edit Current Item") {
                // console.log(answers)
                // console.log(res);
                inquirer.prompt(
                        [
                            {
                                name: "itemName",
                                message: "Which item are you editing?",
                                type: "list",
                                choices: res.map(bay => bay.item_name)
                            }

                        ]
                    )
                endConnection();
            }
        })
        
    })
    
    // connection.end();
}

function updateItem () {
    var updateBid = connection.query("UPDATE bay SET ? WHERE ?", 
    [
        {
        highest_bid: 15
        },
        {
        id: 2,
        },
        
    ], (err, res) => {
        console.log("updated!");
        console.log(res)
    })
    console.log(updateBid.sql);
}

function newItemUpdate(item, category, starting_price, creator) {
    console.log(item + " " + category + " " + starting_price);
    var insertQuery = connection.query(
        "INSERT INTO bay SET ?",
        {
            item_name: item,
            category: category,
            starting_bid: starting_price,
            creator: creator
        },
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " was added!\n");
        });
        console.log(insertQuery.sql);
        queryAllItems();
        endConnection();
}



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