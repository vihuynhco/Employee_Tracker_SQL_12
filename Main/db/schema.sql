DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) 
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INT REFERENCES employee (id) ON DELETE SET NULL,
    role_id INT,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL
);
 
 db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.dept_name, role.salary, CONCAT(manager_id.first_name, ' ', manager_id.last_name) AS manager_id FROM employee LEFT JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.dept_id LEFT JOIN employee manager_id ON employee.manager_id = manager.id", (err, data) => {
        console.table(data)
        init()
    })
}