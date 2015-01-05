//Initialise the HTTP server
var http = require('http');
//Parse requests
var url = require('url');
//Require the keys
var keys = require('./config.js');

http.createServer(function (req, res) {
	if (url.parse(req.url, true).path == "/" + keys.password1) {
		console.log(url.parse(req.url, true));
	}
}).listen(80, '127.0.0.1')