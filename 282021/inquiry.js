var inquirer = require("inquirer");

var genrePrompt = {
    type: "list",
    name: "Genre",
    message: "What Genre?",
    choices: [
        "lofi",
        "Chillhop"
    ]
};

var titlePrompt = {
    type: 'input',
    name: 'title',
    message: "What's the title",
    validate: function (value) {
        if (value == "") {
            console.log("you gotta choose")
        } else {
            return true;
        }
    }
    // default: function() {
    //     return: 'A title',
    // },
};

var artistPrompt = {
    type: 'input',
    name: 'Artist',
    message: "Who's the artist?",
};

inquirer.prompt(titlePrompt).then(answers => {
    console.log(answers.title);
    
    // console.log(answers.title);
    // if (answers.title = " ") {
    //     console.log("rude")
    // }
});






