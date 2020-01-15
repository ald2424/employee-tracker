/*
************ TO DO *********************
----- Add manager ID to add role
----- Add functions to view employees and their roles by department
----- Add functions to view the salary cap for the departments
----- view employee's by manager
----- Update employee to manager
----- figure out how to use table npm
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
        choices: ["view employees", "view managers", "view departments", "view roles", "add employee", "add department", "add role",
                    "update employee roll", "EXIT"]
      })
      .then(function(answer) {
        
        switch (answer.task){
            case "view employees":
                viewEmps();
                break;
            case "view managers":
                viewMan();
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
            case "update employee roll":
                updateEmp();
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

  function viewMan(){
      connection.query("SELECT * FROM managers", function(err, res){
          if(err) throw err;
          console.table(res);
          start();
      })
  }

  function viewDeps(){
    connection.query("SELECT * FROM department", function(err, res) {
            if (err) throw err;
            console.table(res);
            start();
      });
  }

  function viewRoles(){
    connection.query("SELECT * FROM role", function(err, res) {
            if (err) throw err;
            console.table(res);
            start();
      });
  }

//   **********************************************************************************************************

// **********************Functions to add to tables*************************************************************

// prompt user to enter the department to add role_id to employee table
function addEmp(){
    connection.query("SELECT * FROM role", function(err, res){
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
                      choiceArray.push(res[i].title);
                    }
                    return choiceArray;
                  }
              }
        ])
        .then(function(answer){
            let role = answer.role
            let managerID;
            for(var i = 0; i < res.length; i++){
                if(role == res[i].title){
                    role = res[i].id;
                    managerID = res[i].manager_id;
                }
            }

            addEmp2(role, managerID);
        })
    })
}
// get the rest of the information needed to create employee
function addEmp2(role, managerID){

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
          role_id: role,
          manager_id: managerID
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

// Get the Manager for the new role
function addRole(){
connection.query("SELECT * FROM managers", function(err, res){
    if(err) throw err;

    inquirer
    .prompt([
        {
            name: "manager",
            type: "list",
            message: "Select a Manager for the new role: ",
            choices: function() {
                var choiceArray = [];
                for (var i = 0; i < res.length; i++) {
                  choiceArray.push(res[i].first_name + " " + res[i].last_name);
                }
                return choiceArray;
              }
          }
    ])
    .then(function(answer){
        let manager = answer.manager
        let managerID;
        for(var i = 0; i < res.length; i++){
            if(manager == res[i].first_name + " " + res[i].last_name){
                managerID = res[i].id;
            }
        }

        addRole2(managerID);
    })
})
}
// Gets department that the role will belong to
function addRole2(managerID){
    
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
                console.log("The Manager ID is: " + managerID);
                addRole3(department, managerID);
            })
        })
    }

// Gets the rest of the info to create the role
    function addRole3(department, managerID){

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
            "INSERT INTO role SET ?",
            {
              title: answer.title,
              salary: answer.salary,
              department_id: department,
              manager_id: managerID
            },
            function(err) {
              if (err) throw err;
              console.log("The role was successfully added!");
              
              
              start();
            })
    });
    }
// *************************************************************************************************************

// ******************************** Update tables******************************************************************

// update role_id
function updateEmp(){
    // Select employee to update
    // select out of availble roles
    // modify employee's data to update role_id
    connection.query("SELECT * FROM employee", function(err, res){
        if(err) throw err;

        inquirer
        .prompt([
            {
                name: "emp",
                type: "list",
                message: "Which Employee is being modified?",
                choices: function() {
                    var choiceArray = [];
                    for (var i = 0; i < res.length; i++) {
                      choiceArray.push(res[i].first_name + " " + res[i].last_name);
                    }
                    return choiceArray;
                  }
              }
        ])
        .then(function(answer){
            let emp = answer.emp
            let empId;
            for(var i = 0; i < res.length; i++){
                if(emp == (res[i].first_name + " " + res[i].last_name)){
                    empId = res[i].id;
                }
            }
            
            updateEmp2(empId);
        })
    })
}

function updateEmp2(empId){
    connection.query("SELECT * FROM role", function(err, res){
        if(err) throw err;

        inquirer
        .prompt([
            {
                name: "role",
                type: "list",
                message: "Please select the Employee's new role",
                choices: function() {
                    var choiceArray = [];
                    for (var i = 0; i < res.length; i++) {
                      choiceArray.push(res[i].title);
                    }
                    return choiceArray;
                  }
              }
        ])
        .then(function(answer){
            let role = answer.role
            let roleId;
            for(var i = 0; i < res.length; i++){
                if(role == res[i].title){
                    roleId = res[i].id;
                }
            }
            
            updateEmp3(empId, roleId);
        })
    })
}

function updateEmp3(empId, roleId){
    connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, empId], function(err, res){
        if(err) throw err;

        console.log("This employee's role has been updated! \n");

        start();
    })
}
// **********************************************************************************************************************