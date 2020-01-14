/*
************ TO DO *********************
----- Add functions to modify current employee's roles
----- When adding roles, prompt user to either enter a new employee or modify a current employee to switch to that role
      but only if there is more than one employee in the role that the employee currently works for
----- Add functions to view employees and their roles by department
----- Add functions to view the salary cap for the departments
----- Add manager table
----- view employee's by manager
*/

var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Marie2009",
  database: "employee_db"
});

connection.connect(function(err) {

    start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
      .prompt({
        name: "task",
        type: "list",
        message: "Would you like to do?",
        choices: ["view employees", "view departments", "view roles", "add employee", "add department", "add role", "EXIT"]
      })
      .then(function(answer) {
        
        switch (answer.task){
            case "view employees":
                viewEmps();
                break;
            case "view departments":
                viewDeps();
                break;
            case "view roles":
                viewRoles();
                break;
            case "add employee":
                addEmp();
                break;
            case "add department":
                addDep();
                break;
            case "add role":
                addRole();
                break;
            case "EXIT":
                connection.end();
                break;
        }
      });
  }

//   ****************************** Functions to View Tables************************************************
  function viewEmps(){
    connection.query("SELECT * FROM employee", function(err, res) {
            if (err) throw err;
            console.table(res);
            start();
      });
  }

  function viewDeps(){
    connection.query("SELECT * FROM department", function(err, res) {
            if (err) throw err;
            console.table(res);
            start();
      });
  }

  function viewRoles(){
    connection.query("SELECT * FROM roll", function(err, res) {
            if (err) throw err;
            console.table(res);
            start();
      });
  }

//   **********************************************************************************************************

// **********************Functions to add to tables*************************************************************

// prompt user to enter the department to add roll_id to employee table
function addEmp(){
    connection.query("SELECT * FROM department", function(err, res){
        if(err) throw err;

        inquirer
        .prompt([
            {
                name: "role",
                type: "list",
                message: "What is the employee's role?",
                choices: function() {
                    var choiceArray = [];
                    for (var i = 0; i < res.length; i++) {
                      choiceArray.push(res[i].name);
                    }
                    return choiceArray;
                  }
              }
        ])
        .then(function(answer){
            let role = answer.role
            for(var i = 0; i < res.length; i++){
                if(role == res[i].name){
                    role = res[i].id;
                }
            }

            addEmp2(role);
        })
    })
}
// get the rest of the information needed to create employee
function addEmp2(role){

    inquirer
    .prompt([
      {
        name: "fName",
        type: "input",
        message: "Enter the Employee's first name: "
      },
      {
        name: "lName",
        type: "input",
        message: "Enter the Employee's last name:"
      }
    
    ])

    .then(function(answer) {
      
        
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.fName,
          last_name: answer.lName,
          roll_id: role,
          manager_id: 111
        },
        function(err) {
          if (err) throw err;
          console.log("The employee was successfully added!");
          
          
          start();
        })
});
}



// gets info from user to create a new deparment
function addDep(){
    
    inquirer
    .prompt({
       name: "depName",
       type: "input",
       message: "Enter the name of the department" 
    })

    .then(function(answer){
        
        connection.query("INSERT INTO department SET ?",
        {
            name: answer.depName
        })
        
        connection.query("SELECT * FROM department", function(err, res){
            if(err) throw err;

            for(var i = 0; i < res.length; i++){
                if(res[i].name == answer.depName){
                    console.log("You successfully added a new deparment called " + res[i].name + "\n");
                    console.log("The department id is: " + res[i].id);
                }
            }
            start();
        })
    })
}

function addRole(){
    
        connection.query("SELECT * FROM department", function(err, res){
            if(err) throw err;
    
            inquirer
            .prompt([
                {
                    name: "department",
                    type: "list",
                    message: "Which department does this role fit into?",
                    choices: function() {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                          choiceArray.push(res[i].name);
                        }
                        return choiceArray;
                      }
                  }
            ])
            .then(function(answer){
                let department = answer.department
                for(var i = 0; i < res.length; i++){
                    if(department == res[i].name){
                        department = res[i].id;
                    }
                }
    
                addRole2(department);
            })
        })
    }

    function addRole2(department){

        inquirer
        .prompt([
          {
            name: "title",
            type: "input",
            message: "Enter the title of the role: "
          },
          {
            name: "salary",
            type: "input",
            message: "Enter the salary of this role:"
          }
        
        ])
    
        .then(function(answer) {
          
            
          connection.query(
            "INSERT INTO roll SET ?",
            {
              title: answer.title,
              salary: answer.salary,
              department_id: department
            },
            function(err) {
              if (err) throw err;
              console.log("The role was successfully added!");
              
              
              start();
            })
    });
    }
// *************************************************************************************************************