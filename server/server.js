//Requirements
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const queries = require('../mySQL database/databaseQueries.json')


const app = express();
app.use(express.static('../client'));
app.use(express.static('./views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

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
	var token = "";
	var chars = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890!@#$%^&*()[]\;',./{}|:<>?`~-=_+";
	var charsLen = chars.length;
	
	for (i=0; i < 225; i++) {
		token = token + chars[Math.floor(Math.random() * 92) - 1];
	}

	return token
}

//Function to check if a token exists in the database
function isAuthenticated(token) {
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

app.post("/auth", function(req, res) {
	////Auth
	//token for header
	//message in json
	
	// const { token } = req.headers;
	// if (isAuthenticated(token)){
	// 	res.status(403).send();
	// }

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
				res.redirect('http://localhost:3000/home')
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

app.get('/logout', (req, res) => {
	const { token } = req.headers;
	if (!isAuthenticated(token)) {
		res.status(403).send();
		return;
	}

	//TODO remove token

	res.send({status: "OK"});
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


app.get('/note', (req, res) => {
	const { id } = req.query;

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


app.post("/adduser", function(req,res) {
	////AddUser
	//Sends user info to db
	//redirect to login
	
	
});

//	const {title, content} = note;

app.listen(3000, () => {console.log("listening on port 3000")});