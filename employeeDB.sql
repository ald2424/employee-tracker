drop database if exists employee_db;

CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department(
  id INTEGER AUTO_INCREMENT NOT NULL,
  name varchar(50),
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INTEGER AUTO_INCREMENT NOT NULL,
  title varchar(50),
  salary int,
  department_id int,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) 
        REFERENCES department(id)
);

CREATE TABLE employee(
  id INTEGER AUTO_INCREMENT NOT NULL,
  first_name varchar(30),
  last_name varcHAR(30),
  role_id int,
  manager_id int,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) 
        REFERENCES role(id)
);





use employee_db;

alter table employee auto_increment = 1001;

alter table role auto_increment = 100;

            






            



USE employee_db;


insert into employee (first_name, last_name, role_id, manager_id)
	values("Abigail", "DeVries", 100, 1),
		  ("Carol", "Stephens", 101, 2),
          ("Arturo", "Hernandez", 102, 3),
          ("Jan", "Wood", 103, 4),
          ("Mallory", "Mcdaniel", 104, 5);
          
          
insert into role (title, salary, department_id)
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
            



