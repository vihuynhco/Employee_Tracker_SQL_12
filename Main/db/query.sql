--view all department
    SELECT * FROM department;

--View  All ROLES
    SELECT role.id,title,department.dept_name,role.salary FROM role LEFT JOIN department ON role.department_id=department.id;

--view ALL Employees, 
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.dept_name, role.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
    FROM employee AS employee
    LEFT JOIN role AS role ON employee.role_id = role.id
    LEFT JOIN department AS department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id;

    SELECT * FROM employee


--add a department
INSERT INTO department (name) 
VALUES
    (""),

--add a role
INSERT INTO role (title, salary) 
VALUES
    ("titlename", DECIMAL),

--add an employee
INSERT INTO employee (first_name, last_name,) 
VALUES
--update an employee role

