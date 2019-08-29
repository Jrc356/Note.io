//Requirements
const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express();
app.use(express.static('../client'));
app.use(express.static('./views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(cors());

const mysql = require('mysql');
const con = mysql.createConnection({
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

app.get('/note', (req, res) => {
	const { id } = req.query;

	console.log(`Received request for note with id "${id}"`);

	//TODO Implement query note by id here
	//TODO remove dummy data
	data = {data: [
		{
			id: 'ascjub',
			title: 'ajdsvre',
			content: 'iuvbaiusbviubariuevbiursbvkjsbdfbkjvnfadkjgvhauikervhiureabvn'
		},
		{
			id: 'breq',
			title: 'zgre',
			content: 'adskbjvkafbndvknfdaikubvhioudhsbfiuhadkfhbvkjanvskiu hdiouvhkdsahkfzyekufhbaiuebcviua eiuahgfkugh kuaku gkuzdhf vkuahkuhf aikg fjkgakjhkaj gfja gjkhea gjkl aelfgjaegfjk lagjkfl '
		},
		{
			id: 'avurhbvaurhgb',
			title: 'afshvueikrav',
			content: 'adsfagreagaeg'
		}
	]}


	const note = ((id) => {
		n = null;
		data.data.forEach(nt => {
			if (nt.id === id) {
				n = nt;
			}
		});

		return n;
	})(id);

	const {title, content} = note;

	res.render('note/note.html', {title, content});
})


app.get("/save", function(req,res) {
	//Please note this is just a temp placeholder, probably will be a post request to the api
	//Also, let me know of a better name for this process
	
	////Save
	//sends update to db
	//token in header
	
	
	
});

//	const {title, content} = note;

app.listen(3000, () => {console.log("listening on port 3000")});