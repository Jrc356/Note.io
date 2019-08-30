//Requirements
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const queries = require('../database/databaseQueries.json')

//! APP CONFIG
const app = express();
app.use(express.static('../client'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', '../client');
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
	const chars = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890";
	

	for (i=0; i < process.env.TOKEN_LENGTH-1; i++) {
		token = token + chars[Math.floor(Math.random() * (chars.length-1))];
	}

	return token
}

/**
 * Generates and inserts a token into the database
 * then returns that token
 *
 * @param {string} username of user creating token
 * @param {function} callback
 * @returns {object} an object containing the token created and inserted
 */
function createToken(username){
	console.log(`Creating new token for user ${username}`)
	let token = generateToken();

	query = queries.addToken.replace('{tokenStr}', token).replace('{userName}', username);
	console.log(token);
	console.log(query);
	con.query(query, (err) => {
		if(err){
			console.log("ERROR CREATING TOKEN");
			console.log(err);
			token = "ERROR";
		} else {
			console.log("TOKEN ADDED SUCCESSFULLY");
		}
	});

	return token;
}

/**
 * Queries database for token to check if token is valid
 *
 * @param {string} token
 * @returns {boolean} if token is real
 */
function isAuthenticated(token, callback) {
	console.log(`Authenticating token ${token}`);
	con.query(queries.getTokenByStr.replace('{tokenStr}', token),
		function(err,rows) {
		if (err) {
			console.log('Error during processing.');
			console.log(err);
		}
		else {
			if (rows.length === 0) {
				console.log("Auth Failed");
				callback(false);	
			}
			else {
				console.log("Authenticated");
				callback(true);	
			}
		}
	});
}

//! END FUNCTIONS

//! ROUTES
//? LOGIN/LOGOUT
app.post("/auth", function(req, res) {
	const tokenObj = { token : ''};
	console.log(req.body);
	const { username, password } = req.body;

	console.log(`Received auth request for username ${username}`);
	con.query(queries.getUserByUserName.replace('{userName}', username),
		function(err, rows) {
		if (err) {
			console.log('Error during processing.');
			console.log(err);
		} else {
			console.log("Obtained a response.")
			if (rows.size == 0) {
				tokenObj.token = 'ERROR';
			} else if (rows[0].userPassword != password) {
				tokenObj.token = 'ERROR';
			} else {
				tokenObj.token = createToken(username);
			}

			res.send(tokenObj);
		}
	});
});

app.post("/adduser", function(req,res) {
	const { username, password } = req.body;

	console.log(`adding user ${username}`);

	con.query(
		queries.addUser.replace('{userName}', username).replace('{userPassword}', password),
		(err) => {
			if(err) {
				console.log(err);
				res.status(500).send();
			} else {
				res.send({token: createToken(username)});
			}
		}
	);
});


app.get('/logout', (req, res) => {
	const tokenValue = req.query.token;
	isAuthenticated(tokenValue, (auth) => {
		if (!auth) {
			res.status(403).send();
			return
		} else {
			con.query(queries.deleteTokenStr.replace('{tokenStr}', tokenValue), (err) => {
				if(err) {
					console.log(err);
					res.status(500).send();
				} else {
					res.redirect(303, '/login/')
				}
			});
		}
	});
})
//? END LOGIN/LOGOUT

//? NOTES
app.get('/note', (req, res) => {
	const { id } = req.query;
	const tokenValue = req.query.token;
	isAuthenticated(tokenValue, (auth) => {
		if (!auth) {
			res.status(403).send();
			return
		} else {
			if (id === "newNote") {
				let user = '';
				con.query(queries.getTokenByStr.replace('{tokenStr}', tokenValue), (err, result) => {
					if (err){
						console.log(err);
						res.status(500).send();
					} else {
						user = result[0].userName;
					}

				
					console.log("Creating new note!");
					con.query(queries.addNote.replace('{userName}', user), (err, result) => {
						if (err) {
							console.log(err);
						} else {
							console.log(result.insertId);
							res.redirect(303, `/note/?id=${result.insertId}&token=${tokenValue}`);
						}
					})
				})
			}

			else {
				con.query(queries.getNotesByNotesID.replace('{notesID}', id), (err, result) => {
					if (err) { 
						console.log(err);
						res.render('note/note.html', {title:"ERROR", content: "ERROR"});
					} else {
						console.log(result);
						const title = result[0].Title;
						const content = result[0].Content;
						res.render('note/note.html', {title, content});
					}
				})
			}
		}
	})
})

app.get("/notes", function(req,res) {
	const tokenValue = req.headers.token;
	let user = '';
	isAuthenticated(tokenValue, (auth) => {
		if (!auth) {
			res.status(403).send();
			return
		} else {
			con.query(queries.getTokenByStr.replace('{tokenStr}', tokenValue), (err, result) => {
				if (err){
					console.log(err);
					res.status(500).send();
				} else {
					user = result[0].userName;
				}
				console.log(`Retrieving notes for user ${user}`);
			
				con.query(queries.getNotesByUserName.replace('{userName}', user),
					function(err, rows){
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
		}
	});
})

app.post("/save", function(req,res) {
	const tokenValue = req.headers.token;
	isAuthenticated(tokenValue, (auth) => {
		if (!auth) {
			res.status(403).send();
			return
		} else {
			const id = req.body.id;
			const title = req.body.title;
			const content = req.body.content;
			console.log(`Saving note with id ${id}`);
			
			con.query(queries.updateNote.replace('{Title}', title).replace('{Content}', content).replace('{notesID}', id),
				function(err) {
				if (err) {
					console.log('Error during insertion.');
					console.log(err);
					res.status(500).send();
				}
				else {
					console.log("Note saved successfully");
					res.sendStatus(200);
				}
			});
		}
	})
});

//? END NOTES
//! END ROUTES

app.listen(3000, () => {console.log("listening on port 3000")});
