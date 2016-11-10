'use strict';

const PORT = process.env.port || 3000;

var express = require('express');
var morgan  = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var app = express(); 
var fs = require('fs');

var multer = require('multer');


app.use(multer({ dest: './tmp/'}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));




app.get('/', function(req, res){
  var indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

app.get("/process_get", function(req, res){
	var response = {
		first_name: req.query.first_name,
		last_name: req.query.last_name
	};
	res.end(JSON.stringify(response));
});

app.post('/process_post', function(req, res){
	var response = {
		first_name : req.body.first_name,
		last_name : req.body.last_name
	};
	res.end(JSON.stringify(response));
});

app.post('/file_upload', function(req, res) {
	console.log(req.files.file.name);
	console.log(req.files.file.path);
	console.log(req.files.file.type);

	var file = __dirname + "/" + req.files.file.name;

	fs.readFile(req.file.path, function(err, data){

		fs.writeFile(file, data, function(err, data){
			var response = {};
			if(err){
				console.log(err);
			}
			else {
				response = {
					message: 'file uploaded successfully',
					filename: req.files.file.name
				};
			}
			console.log(response);
			res.end(JSON.stringify(response));
		});

	});
});




var server = http.createServer(app);

server.listen(PORT);

server.on('error', function(err){
	console.error(err);
}).on('listening', function(){
	console.log(`You are now listening to ${PORT}, smooth jazz`);
});
