//TODO: Include packages needed for this application
    //npm init-y
    //npm i inquirer@8.2.4

const inquirer= require('inquirer')

// Import and require mysql2
const mysql = require('mysql2');


require('console.table')

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'Scheibel#8080',
    database: 'employee_tracker'
  },
  console.log(`Connected to employee_tracker database.`)
);

//TO VIEW DATA
//***View all Department***/
function viewAllDept(){
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    init()
  });
}

function viewAllRoles(){
  db.query('SELECT role.id,title,department.dept_name,role.salary FROM role LEFT JOIN department ON role.department_id=department.id', function (err, results) {
    console.table(results);
    init()
  });
}

function viewAllEmployees(){
  db.query('SELECT * FROM employee', function (err, results) {
    console.table(results);
    init()
  });
}

//TO ADD DATA
  //ADD DEPT
function addDept(){
  inquirer.prompt([
    {
      type: 'input',
      message: "enter dept name",
      name: 'dept',
    },
  ]).then((response) => {
    const sql = `INSERT INTO department (dept_name)
    VALUES (?)`;
    const params =[response.dept];
    
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error(err)
      }
      console.log("successfully added!")
      init()
    });
  })
}
 //Add Role name and Salary
function addRole(){
  inquirer.prompt([
    {
      type: 'input',
      message: "What is their title?",
      name: 'title',
    },
    {
      type: 'input',
      message: "What is thier salary?",
      name: 'salary',
    },
    {
      type: 'list',
      message: "Which department does the role belong to?",
      choices:['Design and Development','Marketing','Sales','Fish Behavior Research','Customer Service','Fish Accounting','Fish and Culture'],
      name: 'dept_name',
    },
  //needs to take in nubmer for manager_id, user can manually enter but set up logic to pull in man
//depart_name is coming from department; need to add to department.dept_name.   need to "READ" department id to insert into department_id)
]).then((response) => {
    const sql = `INSERT INTO role (title, salary, department_id) 
    SELECT ?,?, id 
    FROM department 
    WHERE dept_name = ?`;

    const params =[response.title,response.salary,response.department];
    
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error(err)
      }
      console.log("successfully added!")
      init()
    });
  })
}

function addEmployee() {
  // Query the database to get a list of all the managers
  let managerChoices=''
  const managerQuery = `SELECT id, CONCAT(first_name, ' ', last_name) AS manager_name FROM employee`;
  db.query(managerQuery, (err, managers) => {
    if (err) {
      console.error(err);
      return;
    }
    inquirer.prompt([
      {
        type: 'input',
        message: "What is their first name?",
        name: 'first_name',
      },
      {
        type: 'input',
        message: "What is their last name?",
        name: 'last_name',
      },
      {
        type: 'list',
        message: "Who is their manager?",
        name: 'manager_id',
        choices: managerChoices
      },
      
    
    ]).then((response) => {
      const sql = `INSERT INTO employee (first_name, last_name, manager_id) 
      VALUES (?, ?, ? )`;

      const params =[response.first_name, response.last_name, response.manager_id,];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.error(err)
        }
        console.log("successfully added!")
        init()
      });
    })
  });
}

function init() {
    inquirer.prompt([
      {
        type: 'list',
        message: "select task",
        choices: ['view all departments', "view all roles", "view all employees", "add a department", "add a role", "add an employee", 'update an employee role'],
        name: 'choice',
      }
    ])
    .then((response) => {
      if (response.choice=='view all departments'){
        viewAllDept()
      }
      if (response.choice=='view all roles'){
        viewAllRoles()
      }
      if (response.choice=='view all employees'){
        viewAllEmployees()
      }
      if (response.choice=='add a department'){
        addDept()
      }
      if (response.choice=='add a role'){
        addRole()
      }
      if (response.choice=='add an employee'){
        addEmployee()
      }
      if (response.choice=='update an employee role'){
        updateEmployee()
      }
})
}

// Function call to initialize app TO RUN
init();