//Requirements
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('../client'));


/// REPLACE ///
const mysql = require('mysql');
const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: '<DATABASE NAME>'
});
/// REPLACE ///

con.connect(function(err) {
	if (err) {
		console.log("Error connecting, please see log.");
		console.log(err);
	}
	else {
		console.log("")
	}
});

app.post("/Auth", function(req, res) {
	
	
});

app.get("/Notes", function(req,res) {
	// all info from notes
	// list of notes under key "data"
});

// Auth
// token for header
// message in json

// Save


// create .env

app.listen(3000, function() {
	console.log("Server started.")
});
