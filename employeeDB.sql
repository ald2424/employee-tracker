drop database if exists employee_db;

CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department(
  id INTEGER AUTO_INCREMENT NOT NULL,
  name varchar(50),
  PRIMARY KEY (id)
);

create table managers (
id int auto_increment not null,
first_name varchar(30) not null,
last_name varchar(30) not null,
primary key(id)
);
alter table managers auto_increment = 2001;

CREATE TABLE role(
  id INTEGER AUTO_INCREMENT NOT NULL,
  title varchar(50),
  salary int,
  manager_id int,
  department_id int,
  PRIMARY KEY (id),
  FOREIGN KEY (manager_id)
		REFERENCES managers(id),
  FOREIGN KEY (department_id) 
        REFERENCES department(id)
);
alter table role auto_increment = 100;

CREATE TABLE employee(
  id INTEGER AUTO_INCREMENT NOT NULL,
  first_name varchar(30),
  last_name varcHAR(30),
  role_id int,
  manager_id int,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) 
        REFERENCES role(id),
  Foreign key (manager_id)
		References managers(id)
);
alter table employee auto_increment = 1001;


insert into managers
	(first_name, last_name)
    values
    ("George", "Hatzel"),
    ("Mallory", "Mcdaniel"),
    ("Julie", "Jenkins"),
    ("Terrie", "Sanchez"),
    ("Roger", "Belk");
    
    insert into department (name)
	values("IT"),
		  ("Sales"),
          ("Finance"),
          ("Customer Service"),
          ("Accounting");
    
    insert into role (title, salary, manager_id, department_id)
	values("Software Developer", 100000, 2002, 1),
		  ("Sales Representative", 60000, 2001, 2),
          ("Finance Manager", 250000, 2003, 3),
          ("Receptionist", 35000, 2004, 4),
          ("Accounting Representative", 70000, 2005, 5);
    
insert into employee (first_name, last_name, role_id, manager_id)
	values("Abigail", "DeVries", 100, 2002),
		  ("Carol", "Stephens", 101, 2001),
          ("Arturo", "Hernandez", 102, 2003),
          ("Jan", "Wood", 103, 2004),
          ("Jackie", "McGovern", 104, 2005);
          
   

    



            

    