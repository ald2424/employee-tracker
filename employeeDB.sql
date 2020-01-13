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


USE employee_db;

insert into employee (first_name, last_name, roll_id, manager_id)
	values("Abigail", "DeVries", 1, 1),
		  ("Carol", "Stephens", 2, 2),
          ("Arturo", "Hernandez", 3, 3),
          ("Jan", "Wood", 4, 4),
          ("Mallory", "Mcdaniel", 5, 5);
          
          
insert into roll (title, salary, department_id)
	values("Software Developer", 100000, 1),
		  ("Sales Representative", 60000, 2),
          ("Finance Manager", 250000, 3),
          ("Receptionist", 35000, 4),
          ("Accounting Representative", 70000, 5);
    
insert into department (name)
	values("IT"),
		  ("Sales"),
          ("Finance"),
          ("Customer Service"),
          ("Accounting");
            



