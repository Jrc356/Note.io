var express = require('express');
var request = require('request');
var app = express();

app.use(express.static("."));


app.get('/oath', function(req,res){ 

//idk what to do here

});

app.listen(3000, function(){
	console.log('Server Started...');
});
