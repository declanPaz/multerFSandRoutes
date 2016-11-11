'use strict';

var fs = require('fs');
var buf = new Buffer(1024);
var newString = "this is going to be input";


fs.readFile("fileToBeRead.txt", function(err, data){
	if(err){
		console.error("err: ",err);
	}
	console.log(data.toString());
});

fs.open("fileToBeRead.txt", "r+",function(err, fd){
	if(err) {
		return console.err("err2: ", err);
	}
	console.log("opened!");
});

fs.stat("fileToBeRead.txt", function(err, stats){
	if(err){
		return console.err("err3: ", err);
	}
	console.log("isfile", stats.isFile());
	console.log("isDreictory?", stats.isDirectory());
});

fs.writeFile("fileToBeRead.txt", newString, function(err){
	if (err) {
		return console.error(err);
	}

	fs.readFile("fileToBeRead.txt", function(err, data){
		if (err){
			return console.error(err);
		}
	});
});


fs.open("fileToBeRead.txt", "r+", function(err, fd){
	if(err){
		console.error(err);
	}
	fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
		if(err){
			console.log(err);
		}

		console.log(bytes + " bytes read");
		
		if(bytes > 0) {
			console.log(buf.slice(0, bytes).toString());
		}
	});
});










