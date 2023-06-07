
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
        view("employee.id, employee.first_name, employee.last_name, roles.title, department.dep_name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager", "employee", "s", "LEFT JOIN roles on employee.role_id = roles.id LEFT JOIN department on roles.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id"); 
        break;
      case "Add a Department":
        addDep();
        break;
      case "Add a Role":
        view("*","department", "role", "");
        break;
      case "Add an Employee":
        view("*","roles", "employee", "");
        break;
      case "Update an Employee Role":
        view("*","roles", "update", "");
        break;
      default:
        console.log(`An error has occured.`);
    }
  });
}

// menu 2 (continue or quit)
const list2 = ["Next Search", "Quit"]
var quitOrNext = () => {
  inquirer
  .prompt(
    {
      type: 'list',
      message: 'What would you like to do next?',
      choices: list2,
      name: 'name',
    },
  )
  .then( function savedata (response){
    if (response.name == "Next Search"){
      menu();
    } else {
        console.log("See you!")
        process.exit();
    }
  });
}


// ------------ initialize inquierer menu.
(function () {
  menu();
})();


const view = (which, specific, type, extra) => {
  // console.log("In function VIEW: ", specific);
  var roleschoice=[]; 
  // console.log(`SELECT ${which} FROM ${specific} ${extra}`)
  db.query(`SELECT ${which} FROM ${specific} ${extra}`, function (err, results) {
    let res = results;

    if (type =="s"){
      console.table(results)
      quitOrNext();
    } else if (type =="role") {
      let i = res.length;
      var depchoice=[];  
      for (n=0; n<i;n++){
        depchoice.push(res[n].dep_name);
      }
      addRole(depchoice);
    } else if (type =="employee"||type =="update"){
      let i = res.length;
      for (n=0; n<i;n++){
        roleschoice.push(res[n].title); 
      }

          db.query(`SELECT * from employee`, function (err, results) {
              let res2 = results;
              let i = res2.length;
              var managerchoice=[];  
              for (n=0; n<i;n++){
                managerchoice.push(res2[n].first_name); 
              }
              if (type =="employee"){
                addEmploy(roleschoice, managerchoice);
              } else if (type =="update"){
                updtRole (roleschoice, managerchoice)
              }
              
          });
    }
  });  
} 

// ----------------------------------------------------------
const addDep = () => {
  // console.log("In function ADDDEP: ");
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
    add("department", "dep_name", `"${response.dep_name}"`);
  });

} 

const addRole = (depchoice) => {
  // console.log("In function ADDROLE: ");
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
    db.query(`SELECT id FROM department WHERE dep_name ="${response.department_id}"`, function (err, results) {
      var iddd= results[0].id;
      add("roles", "title, salary, department_id", `"${response.title}","${response.salary}","${iddd}"`);
    });
  });

} 

const addEmploy = (roleschoice, managerchoice) => {
  // console.log("In function addEmploy: ");
  inquirer
  .prompt([
    {
      type: 'maxlength-input',
      maxLength: 30,
      message: `Input new Employee's First Name`,
      name: 'first_name',
    },
    {
      type: 'maxlength-input',
      maxLength: 30,
      message: `Input new Employee's Last Name`,
      name: 'last_name',
    },
    {
      type: 'list',
      message: 'Which role does the new Employee perform?',
      choices: roleschoice,
      name: 'role_name',
    },
    {
      type: 'list',
      message: 'Who is the Manager of the new Employee?',
      choices: managerchoice,
      name: 'manager_name',
    }])
  .then( function savedata (response){
    db.query(`SELECT id FROM roles WHERE title ="${response.role_name}"`, function (err, results) {
      var iddd= results[0].id;

      db.query(`SELECT id FROM employee WHERE first_name ="${response.manager_name}"`, function (err, results) {
        var iddd2= results[0].id;
        add("employee", "first_name, last_name, role_id, manager_id", `"${response.first_name}","${response.last_name}","${iddd}","${iddd2}"`);
      });
    });
  });

} 

const updtRole = (roleschoice, employeechoice) => {
  // console.log("In function updtRole: ");
  inquirer
  .prompt([
    {
      type: 'list',
      message: 'Which employee do you want to update?',
      choices: employeechoice,
      name: 'employee',
    },
    {
      type: 'list',
      message: `Which is their new role?`,
      choices: roleschoice,
      name: 'role_name',
    }])
  .then( function savedata (response){
    db.query(`SELECT id FROM roles WHERE title ="${response.role_name}"`, function (err, results) {
      var iddd= results[0].id;
      console.log("iddd: "+iddd);
      // db.query(`SELECT id FROM employee WHERE first_name ="${response.employee}"`, function (err, results) {
        // var iddd2= results[0].id;
        console.log(`UPDATE employee SET role_id ="${iddd}" WHERE first_name ="${response.employee}"`)
        db.query(`UPDATE employee SET role_id ="${iddd}" WHERE first_name ="${response.employee}"`, function (err, results) {
          quitOrNext();
        });

      // });
    });
  });

} 

const add = (table, tags, values) => {
  // console.log("In function ADD: ");
  console.log(`INSERT INTO ${table} (${tags}) VALUES (${values});`)
  db.query(`INSERT INTO ${table} (${tags}) VALUES (${values});`,
    function (err, results) {
      console.log(`Added: ${values}`)
      quitOrNext();
  });
} 


  



