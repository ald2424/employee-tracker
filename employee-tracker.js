var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Marie2009",
  database: "employee_db"
});

connection.connect(function(err) {
    // if (err) throw err;
    // console.log("connected: " + connection.threadId);
    // connection.query("SELECT * FROM employee", function(err, res) {
    //     if (err) throw err;
    
    //     // Log all results of the SELECT statement
    //     console.table(res);
    //     connection.end();
//   });

    start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
      .prompt({
        name: "task",
        type: "list",
        message: "Would you like to do? [view employees], [view departments], [view rolls]?",
        choices: ["view employees", "view departments", "view rolls", "EXIT"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        
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
            case "EXIT":
                connection.end();
                break;
        }
      });
  }

  function viewEmps(){
    connection.query("SELECT * FROM employee", function(err, res) {
            if (err) throw err;
        
            // Log all results of the SELECT statement
            console.table(res);
            start();
      });
  }

  function viewDeps(){
    connection.query("SELECT * FROM department", function(err, res) {
            if (err) throw err;
        
            // Log all results of the SELECT statement
            console.table(res);
            start();
      });
  }

  function viewRolls(){
    connection.query("SELECT * FROM roll", function(err, res) {
            if (err) throw err;
        
            // Log all results of the SELECT statement
            console.table(res);
            start();
      });
  }
  