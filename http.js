//Require the keys
var keys = require('./config.js');
//Require the onceler module
var authZero = require('onceler').TOTP;
//Initialise the onceler module
var authOne = new authZero(keys.key, 6);
//HTTP server
var http = require('http');
http.createServer(function (req, res) {
	console.log(req);
  	res.writeHead(200, {'Content-Type': 'text/xml'});
	//res.write("<?xml>\n");
	res.write("<Response>\n");
	res.write("<Message>\n");
	res.write("Your authentication code is: " + authOne.now());
	res.write("</Message>");
	res.write("</Response>");
	res.end();
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

