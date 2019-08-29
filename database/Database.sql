DROP IF EXISTS DATABASE Notes;
CREATE DATABASE Notes;
USE Notes;

CREATE USER IF NOT EXISTS 'noteio'@'localhost' IDENTIFIED BY 'noteio!';
GRANT ALL PRIVILEGES ON Notes.* TO 'noteio'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE userTable(
	userID int NOT NULL AUTO_INCREMENT,
	userName varchar(225),
	userEmail varchar(225),
	userPassword varchar(225),
	
	PRIMARY KEY (userID)
);

INSERT INTO userTable(userName, userEmail, userPassword)
VALUES ("user1","user1@notes.io","default1");

INSERT INTO userTable(userName, userEmail, userPassword)
VALUES ("user2","user2@notes.io","default2");

INSERT INTO userTable(userID, userName, userEmail, userPassword)
VALUES ("user3","user3@notes.io","default3");

INSERT INTO userTable(userID, userName, userEmail, userPassword)
VALUES ("user4","user4@notes.io","default4");


CREATE TABLE userNotes(
	notesID int NOT NULL AUTO_INCREMENT,
	Title varchar(225),
	Content varchar(225),
	ownerID int,
	
	PRIMARY KEY (notesID), 
	
	CONSTRAINT FK_Owner FOREIGN KEY(OwnerID) REFERENCES userTable(userID)
);

INSERT INTO userNotes(Title, Content, ownerID)
VALUES ("To Do List", "Homework: Math, English", "000001");

INSERT INTO userNotes(Title, Content, ownerID)
VALUES ("Example 2", "Example 2", "000001");

INSERT INTO userNotes(Title, Content, ownerID)
VALUES ("Example 3", "Example 3", "000002");

INSERT INTO userNotes(Title, Content, ownerID)
VALUES ("Example 4", "Example 4", "000002");

INSERT INTO userNotes(Title, Content, ownerID)
VALUES ("Example 5", "Example 5", "000003");

INSERT INTO userNotes(Title, Content, ownerID)
VALUES ("Example 6", "Example 6", "000003");

INSERT INTO userNotes(Title, Content, ownerID)
VALUES ("Example 7", "Example 7", "000004");

INSERT INTO userNotes(Title, Content, ownerID)
VALUES ("Example 8", "Example 8", "000004");


CREATE TABLE userToken(
	tokenID int NOT NULL AUTO_INCREMENT,
	tokenStr varchar(225),
	
	PRIMARY KEY (tokenID),
)
















