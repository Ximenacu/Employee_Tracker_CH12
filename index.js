
// invoke app by: node index.js
// to open My SQL shell:  mysql -u root -p 
// npm init -y  (Generates package.json)

// -----------------Packages 
const inquirer = require('inquirer');
// to install: npm i inquirer@8.2.4 (Generates node_modules, and package-lock.json. Adds inquirer to dependencies in package.json)
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt')
// to install: npm i inquirer-maxlength-input-prompt
const mysql = require('mysql2');
// -----------------Packages 

// ------------------Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'J3kyllNHyd3.',
    database: 'EmployeeTracker_db'
  },
  console.log(`Connected to the classlist_db database.`)
);
// ------------------Connect to database

// ------------------Inquirer
const list = ["View all Departments", "View all Roles", "View all Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role"]
inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt)
let mydata={}
inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      choices: list,
      // default: 'View all Departments',
      name: 'name',
    },
  ])
  .then( function savedata (response){
    mydata=response;
    newFile(mydata);
});

const newFile = (mydata) => {
  if (mydata=="View all Departments"){
    db.query('SELECT * FROM department', function (err, results) {
      console.log(results);
    });
  }

} 

