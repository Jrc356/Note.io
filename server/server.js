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
	//Generate a key using a method descibed later
	return "zza67n&dhs09jj12#"
}



app.use(express.static("."));
app.listen(3000, function() {
	console.log("Server started.")
});

app.post("/auth", function(req, res) {
	////Auth
	//token for header
	//message in json
	
	//Setting up the token response and query for authentication and token reserve
	var authObj = { 'user' : req.query.userName, 'token' : genToken(), 'message' : '' };
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
				res.write(authObj);
				res.redirect('http://localhost:8080/Home')
				res.end();
			}
			});
	}
	
	
});

app.get("/notes", function(req,res) {
	////Notes
	//all info from notes
	//list of notes under key "data"
	
	//Setting up token, username, and query variables
	var tokenValue = req.headers.token;
	var userNameValue = req.headers.userName;
	var tokenVerified = 0;
	var responseObj = { 'notes' : {}, 'message' : '' };
	var tokenQuery = '';
	//var tokenQuery = <TOKENQUERY> with userNameValue and tokenValue
	var notesQuery = '';
	//var noteQuery = <NOTESQUERY> using userNameValue

	//Querying for token
	con.query(tokenQuery,
		function(err,rows,fields) {
		if (err) {
			console.log('Error during processing.');
			console.log(err);
		}
		else {
			if (rows.size == 0) {
				responseObj.message = 'No token was found for this username.';
				res.write(responseObj);
				res.end();	
			}
			else if (rows[0].token != tokenValue) {
				responseObj.message = 'Token is incorrect.';
				res.write(responseObj);
				res.end();
			}
			else {
				tokenVerified = 1;
			}
		}
		});
	
	//Querying for the notes from the database
	if (tokenVerified == 1) {
		con.query(noteQuery,
			function(err,rows,fields){
			if (err) {
				console.log('Error during processing.');
				console.log(err);
			}
			else {
				console.log('Obtained a response.');
				repsonseObj.notes = rows;
				responseObj.message = 'Successfully gained a response.';
				res.write(responseObj);
				res.end();
			}
			});
	}
});

app.get("/save", function(req,res) {
	//Please note this is just a temp placeholder, probably will be a post request to the api
	//Also, let me know of a better name for this process
	
	////Save
	//sends update to db
	//token in header
	
	
	
});


