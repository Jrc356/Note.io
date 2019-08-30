DROP DATABASE IF EXISTS Notes;
CREATE DATABASE Notes;
USE Notes;

CREATE USER 'noteio'@'localhost' IDENTIFIED BY 'noteio!';
GRANT ALL PRIVILEGES ON Notes.* TO 'noteio'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE userTable(
	userName varchar(225) NOT NULL,
	userPassword varchar(225),
	
	PRIMARY KEY (userName)
);

INSERT INTO userTable(userName, userPassword)
VALUES ("user1", "default1");

INSERT INTO userTable(userName, userPassword)
VALUES ("user2","default2");

INSERT INTO userTable(userName, userPassword)
VALUES ("user3", "default3");

INSERT INTO userTable(userName, userPassword)
VALUES ("user4", "default4");


CREATE TABLE userNotes(
	notesID int NOT NULL AUTO_INCREMENT,
	Title varchar(225),
	Content TEXT,
	userName varchar(225),
	
	PRIMARY KEY (notesID), 
	
	CONSTRAINT FK_Owner FOREIGN KEY(userName) REFERENCES userTable(userName)
);

INSERT INTO userNotes(Title, Content, userName)
VALUES ("To Do List", "Homework: Math, English", "user1");

INSERT INTO userNotes(Title, Content, userName)
VALUES ("Example 2", "Example 2", "user1");

INSERT INTO userNotes(Title, Content, userName)
VALUES ("Example 3", "Example 3", "user2");

INSERT INTO userNotes(Title, Content, userName)
VALUES ("Example 4", "Example 4", "user2");

INSERT INTO userNotes(Title, Content, userName)
VALUES ("Example 5", "Example 5", "user3");

INSERT INTO userNotes(Title, Content, userName)
VALUES ("Example 6", "Example 6", "user3");

INSERT INTO userNotes(Title, Content, userName)
VALUES ("Example 7", "Example 7", "user4");

INSERT INTO userNotes(Title, Content, userName)
VALUES ("Example 8", "Example 8", "user4");


CREATE TABLE userToken(
	tokenID int NOT NULL AUTO_INCREMENT,
	userName varchar(225),
	tokenStr varchar(225),
	
	PRIMARY KEY (tokenID),
	CONSTRAINT FK_userID FOREIGN KEY(userName) REFERENCES userTable(userName)
);
















