DROP DATABASE IF EXISTS hw_db;
CREATE DATABASE hw_db;

USE hw_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    department_id INT,
     FOREIGN KEY (department)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role)
    REFERENCES role(id),
    manager_id INT NOT NULL,
    FOREIGN KEY
    REFERENCES employee(id)
    ON DELETE SET NULL
);
