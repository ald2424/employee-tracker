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
        choices: ["view employees", "view departments", "view rolls", "add employee", "add department", "add roll", "EXIT"]
      })
      .then(function(answer) {
        
        switch (answer.task){
            case "view employees":
                viewEmps();
                break;
            case "view departments":
                viewDeps();
                break;
            case "view rolls":
                viewRolls();
                break;
            case "add employee":
                addEmp();
                break;
            case "add department":
                addDep();
                break;
            case "add roll":
                addRoll();
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

  function viewRolls(){
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
                name: "roll",
                type: "list",
                message: "What is the employee's roll?",
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
            let roll = answer.roll
            for(var i = 0; i < res.length; i++){
                if(roll == res[i].name){
                    roll = res[i].id;
                }
            }

            addEmp2(roll);
        })
    })
}
// get the rest of the information needed to create employee
function addEmp2(roll){

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
      // when finished prompting, insert a new item into the db with that info
        
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.fName,
          last_name: answer.lName,
          roll_id: roll,
          manager_id: 111
        },
        function(err) {
          if (err) throw err;
          console.log("The employee was successfully added!");
          
          
          start();
        })
});
}




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

function addRoll(){

}
// *************************************************************************************************************