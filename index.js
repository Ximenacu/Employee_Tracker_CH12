
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
        view("department");
        break;
      case "View all Roles": 
        view("roles");
        break;
      case "View all Employees":
        view("employee");
        break;
      case "Add a Department":
        addDep();
        break;
      case "Add a Role":
        addRole();
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


const view = (specific) => {
  console.log("In function VIEW: ", specific);
  db.query(`SELECT * FROM ${specific}`, function (err, results) {
    let res = results;
    console.table(results)
    // console.log(res.length)
    // console.log(res[0].dep_name)
    return res;
    quitOrNext();
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
    add("department", "dep_name", response.dep_name);
  });

} 

const addRole = () => {
  console.log("In function ADDROLE: ");
  var depchoice =[];
  view("department");
  for (n=0; n<res.lenght;n++){
    depchoice.push(res[n].dep_name)
  }
  console.log(depchoice);
// HEEEEEEEEEEEEEEEEEEEEEEEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
  // inquirer
  // .prompt([
  //   {
  //     type: 'maxlength-input',
  //     maxLength: 80,
  //     message: 'Input the name of the New Role',
  //     name: 'title',
  //   },
  //   {
  //     type: 'input',
  //     message: 'What is this Roles salary',
  //     name: 'salary',
  //   },
  //   {
  //     type: 'list',
  //     message: 'To which department does this role belong to?',
  //     choices: ['Circle','Triangle','Square'],
  //     name: 'department_id',
  //   }])
  // .then( function savedata (response){
  //   console.log(response)
  //   add("department", "dep_name", response.dep_name);
  // });

} 

const add = (table, tags, values) => {
  // console.log("In function ADD: ");
  // console.log(`INSERT INTO ${table} (${tags}) VALUES ("${values}");`)
  db.query(`INSERT INTO ${table} (${tags}) VALUES ("${values}");`,
  // db.query(`INSERT INTO ? (?) VALUES (?);`, [table, tags, values],
    function (err, results) {
      console.log(`Added: ${values}`)
      quitOrNext();
  });

  
} 


  



