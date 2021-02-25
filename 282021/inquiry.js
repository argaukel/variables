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
    validate: function (value) {
        if (value == "") {
            console.log("c'mon now!")
        } else {
            return true;
        }
    }
};

var questions = [
    genrePrompt,
    titlePrompt,
    artistPrompt,

]

function runPrompts() {
inquirer.prompt(questions).then(answers => {
    // console.log(answers.title);
    console.log(answers);
    // console.log(answers.title);
    // if (answers.title = " ") {
    //     console.log("rude")
    // }
});

};

runPrompts()




