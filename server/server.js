//Requirements
var express = require('express');
var app = express();
require('dotenv').config()


var mysql = require('mysql');
var con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_ENV
});

con.connect(function(err) {
	if (err) {
		console.log("Error connecting, please see log.");
		console.log(err);
	}
	else {
		console.log("Successfully connected to database.")
	}
	});

//Function that generates a key for the user
function genToken() {
	var token = "";
	var chars = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890!@#$%^&*()[]\;',./{}|:<>?`~-=_+";
	var charsLen = chars.length;
	
	for (i=0; i < 225; i++) {
		token = token + chars[Math.floor(Math.random() * 92) - 1];
	}
	
	return token
}

//Function to check if a token exists in the database
function isauthenticated(token) {
	var tokenQuery = "QUERY FOR TOKEN token";
	
	con.query(tokenQuery,
		function(err,rows,fields) {
		if (err) {
			console.log('Error during processing.');
			console.log(err);
		}
		else {
			if (rows.size == 0) {
				return False;	
			}
			else {
				return True;	
			}
		}
		});
}



app.use(express.static("."));
app.listen(3000, function() {
	console.log("Server started.")
	console.log(genToken())
});

app.post("/auth", function(req, res) {
	////Auth
	//token for header
	//message in json
	
	//Setting up the token response and query for authentication and token reserve
	var authObj = { 'token' : '', 'message' : '' };
	var userCorrect = 0;
	var authQuery = '';
	//var authQuery = <AUTHQUERY> with req.query.userName
	var tokenQuery = '';
	//var tokenQuery = <TOKENQUERY> using authObj.token and authObj.userName
	
	//Querying for username
	con.query(authQuery,
		function(err,rows,fields) {
		if (err) {
			console.log('Error during processing.');
			console.log(err);
		}
		else {
			console.log("Obtained a response.")
			if (rows.size == 0) {
				authObj.message = 'Username was incorrect.';
				res.write(authObj);
				res.end();
			}
			else if (rows[0].userName != req.query.userName) {
				authObj.message = 'Password was incorrect.';
				res.write(authObj);
				res.end();
			}
			else {
				userCorrect = 1;
			}
		}
		});
	
	//Redirecting and sending information back to the user
	if (userConnect == 1) {
		con.query(tokenQuery, 
			function(err, result) {
			if (err) {
				console.log('Error during insertion.');
				console.log(err);	
			}
			else {
				console.log('Successfully inserted rows');
				authObj.message = 'Login was successful.';
				authObj.token = getToken() 
				res.write(authObj);
				res.redirect('http://localhost:3000/Home')
				res.end();
			}
			});
	}
	
	
});

app.get("/notes", function(req,res) {
	////Notes
	//all info from notes
	//list of notes under key "data"
	
	//Setting up token and query variables
	var tokenValue = req.headers.token;
	var notesQuery = '';
	//var noteQuery = <NOTESQUERY> using userid

	//Querying for token
	if (isauthenticated(tokenValue) == False) {
		console.log("Auth Failed");
		res.status(403);
		res.end();
	}
	
	//Querying for the notes from the database
	con.query(noteQuery,
		function(err,rows,fields){
		if (err) {
			console.log('Error during processing.');
			console.log(err);
		}
		else {
			console.log('Obtained a response.');
			res.write(rows);
			res.end();
		}
		});
});

app.get("/save", function(req,res) {
	//Please note this is just a temp placeholder, probably will be a post request to the api
	//Also, let me know of a better name for this process
	
	////Save
	//sends update to db
	//token in header
	
	var tokenValue = req.headers.token;
	var saveQuery = '';
	//var saveQuery = 'QUERY TO DB TO SAVE req.query.note, req.query.headline USING req.query.id';	
	
	//Quering for token
	if (isauthenticated(tokenValue) == False) {
		console.log("Auth Failed");
		res.status(403);
		res.end();
	}
	
	con.query(saveQuery,
		function(err,result) {
		if (err) {
			console.log('Error during insertion.');
			console.log(err);
			res.status(500);
			res.end();
		}
		else {
			res.status(200);
			res.end();
		}
	});
	
});

app.post("/adduser", function(req,res) {
	////AddUser
	//Sends user info to db
	//redirect to login
	
	
});


