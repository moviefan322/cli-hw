INSERT INTO department (name)
VALUES 
    ("Sales"),
    ("Management"),
    ("Human Resources"),
    ("Services"),
    ("Deployment"),
    ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES 
    ("Head of Sales", 20000, 1),
    ("Junior Sales Rep", 15000, 1),
    ("Head Manager", 20000, 2),
    ("Junior Manager", 15000, 2),
    ("Human Wrangler", 15000, 3),
    ("Assisstant", 10000, 3),
    ("Head of Services", 20000, 4),
    ("Junior Serviceperson", 15000, 4),
    ("Head Deployer", 20000, 5),
    ("Junior Deployer", 15000, 5),
    ("Head Lawyer", 20000, 6),
    ("Junior Lawyer", 15000, 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES 
    ("Jeff", "Jordan", 1),
    ("Mark", "Marcus", 2),
    ("Mark", "Twain", 3),
    ("Deron", "Dalton", 4),
    ("Mackenzie", "Gore", 5),
    ("Efren", "Reyes", 6),
    ("Peebles", "Mackintosh", 7),
    ("Elaine", "Steadfarm", 8),
    ("Jackie", "Macklemore", 9),
    ("Bobby", "Pin", 10),
    ("Bridget", "Jones", 11),
    ("Zyvbjyanixch", "Zybranovoj", 11);