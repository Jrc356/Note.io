//Requirements
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.static('../client'));
app.use(express.static('./views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(cors());

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

app.post("/auth", function(req, res) {
	
	
});

app.get("/notes", function(req,res) {
	const { token } = req.headers;
	res.send({data: [
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
	]});
	// all info from notes
	// list of notes under key "data"
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

// Auth
// token for header
// message in json

// Save


// create .env

app.listen(3000, function() {
	console.log("Server started.")
});
