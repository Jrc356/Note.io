//Requirements
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const queries = require('../database/databaseQueries.json')

//! APP CONFIG
const app = express();
app.use(express.static('../client'));
app.use(express.static('./views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//! END APP CONFIG

//! DB SETUP
const mysql = require('mysql');
const con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
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

//! END DB SETUP


//! FUNCTIONS
/**
 * Generates random string of length TOKEN_LENGTH defined in
 * the .env file. This is used for client authentication
 *
 * @returns token string
 */
function generateToken() {
	
	let token = "";
	const chars = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890!@#$%^&*()[]\;',./{}|:<>?`~-=_+";
	

	for (i=0; i < process.env.TOKEN_LENGTH; i++) {
		token = token + chars[Math.floor(Math.random() * chars.length) - 1];
	}

	return token
}


/**
 * Queries database for token to check if token is valid
 *
 * @param {string} token
 * @returns {boolean} if token is real
 */
function isAuthenticated(token) {
	con.query("QUERY FOR TOKEN token",
		function(err,rows,fields) {
		if (err) {
			console.log('Error during processing.');
			console.log(err);
		}
		else {
			if (rows.size == 0) {
				return false;	
			}
			else {
				return true;	
			}
		}
	});
}

/**
 * Generates and inserts a token into the database
 * then returns that token
 *
 * @returns {object} an object containing the token created and inserted
 */
function createToken(){
	let token = generateToken();

	con.query("insert token query", (err, result) => {
		if(err){
			console.log(err);
			token = "ERROR"
		}
	})

	return {token}
}
//! END FUNCTIONS

//! ROUTES
//? LOGIN/LOGOUT
app.post("/auth", function(req, res) {
	const authObj = { 'token' : '', 'message' : '' };
	const { username, password } = req.body;
	//Querying for username
	con.query("get username and password",
		function(err,rows,fields) {
		if (err) {
			console.log('Error during processing.');
			console.log(err);
		} else {
			console.log("Obtained a response.")
			if (rows.size == 0) {
				authObj.message = 'Username was incorrect.';
				res.send(authObj);
			} else if (rows[0].userPassword != password) {
				authObj.message = 'Password was incorrect.';
				res.send(authObj);
			} else {
				res.send(createToken());
			}
		}
	});
});

app.post("/adduser", function(req,res) {
	console.log("adding user");
});


app.get('/logout', (req, res) => {
	const { token } = req.headers;
	if (!isAuthenticated(token)) {
		res.status(403).send();
		return;
	}

	con.query("delete token query", (err, result) => {
		if(err) {
			console.log(err);
		} else {
			res.send({status: "OK"});
		}
	});
})
//? END LOGIN/LOGOUT

//? NOTES
app.get('/note', (req, res) => {
	const { id } = req.query;

	con.query("get note by id query", (err, result) => {
		if (err) { 
			console.log(err);
			res.render('note/note.html', {title:"ERROR", content: "ERROR"});
			return
		} else {
			const {title, content} = result;
			res.render('note/note.html', {title, content});
		}
	});
})

app.get("/notes", function(req,res) {
	const tokenValue = req.headers.token;

	//Querying for token
	if (isAuthenticated(tokenValue) == false) {
		console.log("Auth Failed");
		res.status(403);
		res.end();
	}
	
	//Querying for the notes from the database
	con.query("get all notes for user query",
		function(err,rows,fields){
		if (err) {
			console.log('Error during processing.');
			console.log(err);
		}
		else {
			console.log('Obtained a response.');
			res.send(rows);
		}
	});
})

app.post("/save", function(req,res) {
	const { token } = req.headers;
	if (!isAuthenticated(token)) {
		res.status(403).send();
		return;
	}

	const id = req.body.id;
	const title = req.body.title;
	const content = req.body.content;
	console.log(`Saving note with id ${id}`);
	
	//TODO add insert query
	res.send({status: 'ok'});

	const tokenValue = req.headers.token;
	
	//Quering for token
	if (isAuthenticated(tokenValue) == false) {
		console.log("Auth Failed");
		res.status(403);
		res.end();
	}
	
	con.query("saveQuery",
		function(err,result) {
		if (err) {
			console.log('Error during insertion.');
			console.log(err);
			res.status(500).send();
		}
		else {
			res.status(200).send();
		}
	});
	
});

//? END NOTES
//! END ROUTES

app.listen(3000, () => {console.log("listening on port 3000")});
