//DEPENDENCIES
require("dotenv").config();
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const db = mysql.createConnection(
  {
    host: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "hw_db",
  },
  console.log("DB Connected")
);
//DATA

//FUNCTIONS
const displayDepartments = () => {
  db.query("SELECT * FROM department", (err, department) => {
    console.table(department);

    const optionsTwo = {
      type: "list",
      message: "What next?",
      name: "choice",
      choices: ["Return to main menu", "Exit"],
    };

    inquirer.prompt(optionsTwo).then(({ choice }) => {
      console.log(choice);
      switch (choice) {
        case "Return to main menu":
          return init();
        case "exit":
          process.exit(1);
      }
    });
  });
};

const displayRoles = () => {
  db.query("SELECT * FROM role", (err, role) => {
    console.table(role);

    const optionsTwo = {
      type: "list",
      message: "What next?",
      name: "choice",
      choices: ["Return to main menu", "Exit"],
    };

    inquirer.prompt(optionsTwo).then(({ choice }) => {
      console.log(choice);
      switch (choice) {
        case "Return to main menu":
          return init();
        case "exit":
          process.exit(1);
      }
    });
  });
};

const displayEmployees = () => {
  db.query("SELECT * FROM employee", (err, employee) => {
    console.table(employee);

    const optionsTwo = {
      type: "list",
      message: "What next?",
      name: "choice",
      choices: ["Return to main menu", "Exit"],
    };

    inquirer.prompt(optionsTwo).then(({ choice }) => {
      console.log(choice);
      switch (choice) {
        case "Return to main menu":
          return init();
        case "exit":
          process.exit(1);
      }
    });
  });
};

const addDepartment = () => {
  const adq = {
    type: "input",
    name: "choice",
    message: "What is the name of the department?",
  };

  inquirer.prompt(adq).then(({ choice }) => {
    db.query(
      "INSERT INTO department (name) VALUES (?)",
      [choice],
      (err, department) => {
        displayDepartments();
      }
    );

    const optionsTwo = {
      type: "list",
      message: "What next?",
      name: "choice",
      choices: ["Return to main menu", "Exit"],
    };

    inquirer.prompt(optionsTwo).then(({ choice }) => {
      console.log(choice);
      switch (choice) {
        case "Return to main menu":
          return init();
        case "Exit":
          process.exit(1);
      }
    });
  });
};

const addRole = () => {
  const addRoleQuestions = [
    {
      type: "input",
      name: "title",
      message: "What is the name of the role?",
    },
    {
      type: "number",
      name: "salary",
      message: "What is the salary?",
    },
    {
      type: "input",
      name: "department",
      message: "What department is it in (use department ID)?",
    },
  ];

  inquirer.prompt(addRoleQuestions).then(({ title, salary, department }) => {
    db.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [title, salary, department],
      (err, role) => {
        displayRoles();
      }
    );

    const optionsTwo = {
      type: "list",
      message: "What next?",
      name: "choice",
      choices: ["Return to main menu", "Exit"],
    };

    inquirer.prompt(optionsTwo).then(({ choice }) => {
      console.log(choice);
      switch (choice) {
        case "Return to main menu":
          return init();
        case "Exit":
          process.exit(1);
      }
    });
  });
};

const addEmployee = () => {
  const addEmployeeQuestions = [
    {
      type: "input",
      name: "first_name",
      message: "What is the employee's first name?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is employee's last name?",
    },
    {
      type: "list",
      message: "What is the employee's role?",
      name: "role_id",
      choices: [
        { name: "Head of Sales", value: 1 },
        { name: "Junior Sales Rep", value: 2 },
        { name: "Head Manager", value: 3 },
        { name: "Junior Manager", value: 4 },
        { name: "Human Wrangler", value: 5 },
        { name: "Assisstant", value: 6 },
        { name: "Head of Services", value: 7 },
        { name: "Junior Salesperson", value: 8 },
        { name: "Head Deployer", value: 9 },
        { name: "Head Lawyer", value: 10 },
        { name: "Junior Lawyer", value: 11 },
      ],
    },
    {
      type: "input",
      name: "manager_id",
      message: "What is the managers id number?",
    },
  ];

  inquirer
    .prompt(addEmployeeQuestions)
    .then(({ first_name, last_name, role_id, manager_id }) => {
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [first_name, last_name, role_id, manager_id],
        (err, role) => {
          displayEmployees();
        }
      );
    });
};

const updateEmployeeRole = () => {
  db.query(
    `SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS employee_name, role.title 
        FROM employee 
        JOIN role ON employee.role_id = role.id`,
    (err, results) => {
      if (err) throw err;
      // Convert the results into an array of choices for the prompt
      const employeeChoices = results.map((result) => ({
        name: result.employee_name,
        value: result.id,
        role: result.title,
      }));
      // Prompt the user to select an employee to update
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee would you like to update?",
            name: "employee_id",
            choices: employeeChoices,
          },
          {
            type: "list",
            message: "What is the employee's new role?",
            name: "role_id",
            choices: [
              { name: "Head of Sales", value: 1 },
              { name: "Junior Sales Rep", value: 2 },
              { name: "Head Manager", value: 3 },
              { name: "Junior Manager", value: 4 },
              { name: "Human Wrangler", value: 5 },
              { name: "Assisstant", value: 6 },
              { name: "Head of Services", value: 7 },
              { name: "Junior Salesperson", value: 8 },
              { name: "Head Deployer", value: 9 },
              { name: "Head Lawyer", value: 10 },
              { name: "Junior Lawyer", value: 11 },
            ],
          },
        ])
        .then((answers) => {
          // Update the employee's role in the database
          db.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [answers.role_id, answers.employee_id],
            (err) => {
              if (err) throw err;
              console.log("Employee role updated successfully!");
              displayEmployees();
            }
          );
        });
    }
  );
};

const init = () => {
  const options = {
    //see todo list
    type: "list",
    message: "What do you want to do?",
    name: "choice",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update employee role",
      "Exit",
    ],

    //add a todo
    //complete a todo
    //categorize todos
    //add a catrgory
  };
  inquirer.prompt(options).then(({ choice }) => {
    console.log(choice);
    switch (choice) {
      case "View all departments":
        return displayDepartments();
      case "View all roles":
        return displayRoles();
      case "View all employees":
        return displayEmployees();
      case "Add a department":
        return addDepartment();
      case "Add a role":
        return addRole();
      case "Add an employee":
        return addEmployee();
      case "Update employee role":
        return updateEmployeeRole();
      case "exit":
        process.exit();
    }
  });
};

//USER INTERACTIONS
init();
