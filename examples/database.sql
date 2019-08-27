-- DROP DATABASE IF EXISTS
DROP DATABASE IF EXISTS cs275_assn5;

-- CREATE DATABASE 
CREATE DATABASE IF NOT EXISTS cs275_assn5;
USE cs275_assn5;

-- CREATE TABLES
CREATE TABLE IF NOT EXISTS student (
  id VARCHAR(10) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  dob DATE,
  major VARCHAR(4),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS course (
  id VARCHAR(10) NOT NULL,
  course_description VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS grades (
  id INT NOT NULL AUTO_INCREMENT,
  course_id VARCHAR(10) NOT NULL,
  student_id VARCHAR(10) NOT NULL,
  term VARCHAR(10) NOT NULL,
  grade CHAR NOT NULL,
  
  PRIMARY KEY (id),
  
  FOREIGN KEY (course_id)
    REFERENCES course(id),

  FOREIGN KEY (student_id)
    REFERENCES student(id)
);

-- ADD UNIQUE
ALTER TABLE grades ADD UNIQUE(course_id, student_id, term);

-- CONFIRMATION
SHOW tables;
DESCRIBE course;
DESCRIBE student;
DESCRIBE grades;

-- ADD USER
CREATE USER IF NOT EXISTS 'assn5'@'localhost' IDENTIFIED BY 'cs275_assn5!';
GRANT ALL PRIVILEGES ON cs275_assn5.* TO 'assn5'@'localhost';
FLUSH PRIVILEGES;

-- INSERT DATA
---- INSERT STUDENTS
INSERT INTO student (id, first_name, last_name, dob, major) 
  VALUES('jrc356', 'jon', 'corbin', STR_TO_DATE('11-11-1996', '%d-%m-%Y'), 'MIS');
INSERT INTO student (id, first_name, last_name, dob, major) 
  VALUES('abc123', 'billy', 'ray', STR_TO_DATE('1-01-2012', '%d-%m-%Y'), 'CS');
INSERT INTO student (id, first_name, last_name, dob, major) 
  VALUES('sjt456', 'sarah', 'thompson', STR_TO_DATE('16-04-1997', '%d-%m-%Y'), 'BUSN');

---- INSERT COURSES
INSERT INTO course (id, course_description) 
  VALUES('cs275', 'web and mobile development');
INSERT INTO course (id, course_description) 
  VALUES('cs260', 'data stuctures and algorithms');
INSERT INTO course (id, course_description) 
  VALUES('mrkt201', 'intro to marketing');
INSERT INTO course (id, course_description) 
  VALUES('phto110', 'photography');

---- WINTER19 Grades
INSERT INTO grades (course_id, student_id, term, grade) 
  VALUES('cs275', 'jrc356', 'Winter19', 'A');
INSERT INTO grades (course_id, student_id, term, grade) 
  VALUES('cs275', 'abc123', 'Winter19', 'F');
INSERT INTO grades (course_id, student_id, term, grade) 
  VALUES('cs260', 'jrc356', 'Winter19', 'B');
INSERT INTO grades (course_id, student_id, term, grade) 
  VALUES('cs260', 'abc123', 'Winter19', 'F');
INSERT INTO grades (course_id, student_id, term, grade) 
  VALUES('mrkt201', 'jrc356', 'Winter19', 'D');
INSERT INTO grades (course_id, student_id, term, grade) 
  VALUES('mrkt201', 'sjt456', 'Winter19', 'B');
INSERT INTO grades (course_id, student_id, term, grade) 
  VALUES('phto110', 'sjt456', 'Winter19', 'A');
INSERT INTO grades (course_id, student_id, term, grade) 
  VALUES('phto110', 'abc123', 'Winter19', 'C');

---- SUMMER19 Grades
INSERT INTO grades (course_id, student_id, term, grade) 
  VALUES('cs260', 'abc123', 'Summer19', 'C');
INSERT INTO grades (course_id, student_id, term, grade) 
  VALUES('cs275', 'abc123', 'Summer19', 'B');
INSERT INTO grades (course_id, student_id, term, grade) 
  VALUES('phto110', 'jrc356', 'Summer19', 'F');
INSERT INTO grades (course_id, student_id, term, grade) 
  VALUES('cs275', 'sjt456', 'Summer19', 'D');
INSERT INTO grades (course_id, student_id, term, grade) 
  VALUES('cs260', 'sjt456', 'Summer19', 'A');
INSERT INTO grades (course_id, student_id, term, grade) 
  VALUES('mrkt201', 'abc123', 'Summer19', 'C');

---- FALL19 Grades
INSERT INTO grades (course_id, student_id, term, grade) 
  VALUES('phto110', 'jrc356', 'Fall19', 'A');
INSERT INTO grades (course_id, student_id, term, grade) 
  VALUES('cs275', 'sjt456', 'Fall19', 'B');