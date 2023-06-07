# SQL Challenge: Employee Tracker

Build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## Notes 
* Walkthrough Video (add to readme)
* To install inquirer, please use: npm i inquirer@8.2.4
* You'll need to use the MySQL2 package to connect to your MySQL database
* You might also want to make your queries asynchronous. MySQL2 exposes a .promise() function on Connections to upgrade an existing non-Promise connection to use Promises. To learn more and make your queries asynchronous, refer to the [npm documentation on MySQL2](#https://www.npmjs.com/package/mysql2)
* You might want to use a separate file that contains functions for performing specific SQL queries you'll need to use. 
    * A constructor function or class could be helpful for organizing these. 
* You might also want to include a seeds.sql file to pre-populate your database, making the development of individual features much easier.

BONUS
* Try to add some additional functionality to your application, such as the ability to do the following:
    * Update employee managers.
    * View employees by manager.
    * View employees by department.
    * Delete departments, roles, and employees.
    * View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.

## User Story 
AS A business owner<n/>
I WANT to be able to view and manage the departments, roles, and employees in my company<n/>
SO THAT I can organize and plan my business

## Acceptance Criteria 
GIVEN a command-line application that accepts user input: <n/>
* WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role ✅

* WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids ✅

* WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role ✅

* WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to ✅

* WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database  ✅

* WHEN I choose to add a role  ✅
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database  ✅

* WHEN I choose to add an employee 
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database ✅

* WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database ✅

## Deliverables 
* Loads with no errors and is console free of errors  ✅
* Github Repo link submited
    * Quality README 
* Walkthrough Video (submit and link in readme)
    * must show all of the technical acceptance criteria being met.
    * must demonstrate how a user would invoke the application from the command line.
    * must demonstrate a functional menu with the options outlined in the acceptance criteria.
* uses inquirer  ✅
* mysql2  ✅
* Bonus will add 10 pts


    