CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE employee(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  first_name varchar(30),
  last_name varcHAR(30),
  roll_id int,
  manager_id int,
  PRIMARY KEY (id)
);

CREATE TABLE roll(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  title varchar(50),
  salary int,
  department_id int,
  PRIMARY KEY (id)
);

CREATE TABLE department(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  name varchar(50),
  PRIMARY KEY (id)
);



            



