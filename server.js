//DEPENDENCIES
require("dotenv").config();
const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "todos_db",
  },
  console.log("DB Connected")
);
//DATA

//FUNCTIONS
const displayTodos = () => {
    db.query('SELECT * FROM todos', (err, todos) => {
        todos.forEach({ description }) => {console.log(description);
    });
  //get todos
  //show them
  //return to menu
};

const init = () => {
  console.log("let's go!!");

  const options = {
    //see todo list
    type: "list",
    message: "what do you want to do?",
    name: "choice",
    choices: [
      "see todo list",
      // "add todo",
      "add a todo"
      // "complete todo",
      // "categorize todos"
    ],

    //add a todo
    //complete a todo
    //categorize todos
    //add a catrgory
  };
  return inquirer.prompt(options).then(({ choice }) => {
    console.log(choice);
    switch(choice) {
        case "See todo list":
        return displayTodos();
        case "exit":
            return process.exit();
    }
    
  });
};

const addTodo = () => {
    //ask user what they want todo
    return inquirer.prompt({
        type: "input",
        message: "enter todo:",
        name: "todo"
    }).then(({ todo })) => {

    db.query('INSERT INTO todos (description) VALUES ("Buy Milk";'), (err, todos) => {
        return init ();
    }
}

//USER INTERACTIONS
init();
