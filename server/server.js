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

app.use(express.static("."));
app.listen(3000, function() {
	console.log("Server started.")
});

app.post("/Auth", function(req, res) {
	////Auth
	//token for header
	//message in json
	
});

app.get("/Notes", function(req,res) {
	////Notes
	//all info from notes
	//list of notes under key "data"
	
});

app.get("/Save", function(req,res) {
	//Please note this is just a temp placeholder, probably will be a post request to the api
	//Also, let me know of a better name for this process
	
	
	////Save
	//sends update to db
	//token in header
	
});


