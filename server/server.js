//Requirements
var express = require('express');
var app = express();


/// REPLACE ///
var mysql = require('mysql');
var con = mysql.createCOnnection({
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

app.use(express.static("."));
app.listen(3000, function() {
	console.log("Server started.")
});

app.post("/Auth", function(req, res) {
	
	
});

app.get("/Notes", function(req,res) {
	
	
});

/Auth
token for header
message in json

/Notes
all info from notes
list of notes under key "data"

/Save
sends update to db
token in header


create .env