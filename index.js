
// invoke app by: node index.js
// npm init -y  (Generates package.json)
// -----------------Packages 
const inquirer = require('inquirer');
// to install: npm i inquirer@8.2.4 (Generates node_modules, and package-lock.json. Adds inquirer to dependencies in package.json)
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt')
// to install: npm i inquirer-maxlength-input-prompt
// to open My SQL shell:  mysql -u root -p 
// -----------------Packages 
const list = ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
// begin: 
inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt)
let mydata={}
inquirer
  .prompt([
    {
      type: 'list',
      message: 'Select a SHAPE',
      choices: list,
      default: 'Circle',
      name: 'name',
    },
  ])
  .then( function savedata (response){
    mydata=response;
    newFile(mydata);
});

const newFile = (mydata) => {

} 

