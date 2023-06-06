
// invoke app by: node index.js or npm start 
// to open My SQL shell:  mysql -u root -p 
// npm init -y  (Generates package.json)

// -----------------Packages 
const inquirer = require('inquirer');
// to install: npm i inquirer@8.2.4 (Generates node_modules, and package-lock.json. Adds inquirer to dependencies in package.json)
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt')
// to install: npm i inquirer-maxlength-input-prompt
// const mysql = require('mysql2');
// to install: npm install mysql2---------Connected  database in server.js file
const db = require('./db/server');
// -----------------Packages 


// ------------------Inquirer Menu
const list = ["View all Departments", "View all Roles", "View all Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role"]
inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt)
let mydata={}
var menu = () => {
  inquirer
  .prompt(
    {
      type: 'list',
      message: 'What would you like to do?',
      choices: list,
      // default: 'View all Departments',
      name: 'name',
    },
  )
  .then( function savedata (response){
    mydata=response;
    switch (mydata.name) {
      case "View all Departments": 
        view("*","department", "s", "");
        break;
      case "View all Roles": 
      view("*", "roles", "s", "JOIN department ON roles.department_id = department.id;");
        break;
      case "View all Employees":
        view("*", "employee", "s", "JOIN roles ON employee.role_id = roles.id JOIN department ON roles.department_id = department.id"); 
        break;
      case "Add a Department":
        addDep();
        break;
      case "Add a Role":
        view("*","department", "c", "");
        break;
      case "Add an Employee":
        view(mydata,"department");
        break;
      case "Update an Employee Role":
        console.log("Update");
        break;
      default:
        console.log(`An error has occured.`);
    }
    // newFile(mydata);
  });
}

const list2 = ["Next Search", "Quit"]
var quitOrNext = () => {
  inquirer
  .prompt(
    {
      type: 'list',
      message: 'What would you like to do next?',
      choices: list2,
      // default: 'Quit',
      name: 'name',
    },
  )
  .then( function savedata (response){
    console.log(response)
    if (response.name == "Next Search"){
      menu();
    } else {
      db.query(`quit;`, function (err, results) {
        console.log("See you!")
      });
    }
  });
}


// ------------ initialize inquierer.
(function () {
  menu();
})();

// view("id, dep_name","department", "s"); for department
// view("*", "roles", "s", "JOIN department ON roles.department_id = department.id;");
// view("*", "employee", "s", "JOIN roles ON employee.role_id = roles.id JOIN department ON roles.department_id = department.id;");
const view = (which, specific, type, extra) => {
  console.log("In function VIEW: ", specific);
  console.log(`SELECT ${which} FROM ${specific} ${extra}`)
  db.query(`SELECT ${which} FROM ${specific} ${extra}`, function (err, results) {
    let res = results;

    if (type =="s"){
      console.log("in")
      console.table(results)
      quitOrNext();
    } else {
      let i = res.length;
      var depchoice=[];  
      for (n=0; n<i;n++){
        depchoice.push(res[n].dep_name); 
      }
      console.log("Depchoice: "+depchoice);
      addRole(depchoice);
    }
  });
  
  
} 

// ----------------------------------------------------------
const addDep = () => {
  console.log("In function ADDDEP: ");
  inquirer
  .prompt(
    {
      type: 'maxlength-input',
      maxLength: 120,
      message: 'Input Department Name',
      name: 'dep_name',
    },
  )
  .then( function savedata (response){
    console.log(response)
    add("department", "dep_name", `"${response.dep_name}"`);
    // add("department", "dep_name", response.dep_name);
  });

} 

const addRole = (depchoice) => {
  console.log("In function ADDROLE: ");
  inquirer
  .prompt([
    {
      type: 'maxlength-input',
      maxLength: 80,
      message: 'Input the name of the New Role',
      name: 'title',
    },
    {
      type: 'input',
      message: 'What is this Roles salary',
      name: 'salary',
    },
    {
      type: 'list',
      message: 'To which department does this role belong to?',
      choices: depchoice,
      name: 'department_id',
    }])
  .then( function savedata (response){
    console.log(response)
    db.query(`SELECT id FROM department WHERE dep_name ="${response.department_id}"`, function (err, results) {
      var iddd= results[0].id;
      console.log("Query: " + )
      add("roles", "title, salary, department_id", `"${response.title}","${response.salary}","${iddd}"`);
    });
  });

} 

const add = (table, tags, values) => {
  // console.log("In function ADD: ");
  console.log(`INSERT INTO ${table} (${tags}) VALUES (${values});`)
  db.query(`INSERT INTO ${table} (${tags}) VALUES (${values});`,
  // db.query(`INSERT INTO ? (?) VALUES (?);`, [table, tags, values],
    function (err, results) {
      console.log(`Added: ${values}`)
      quitOrNext();
  });
} 


  



