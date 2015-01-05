//Require the keys
var keys = require('./config.js');
//Require the Twilio REST API
var twilio = require('twilio');
//Require the onceler module
var authZero = require('onceler').TOTP;
//Initialise the HTTP server
var http = require('http');
//Initialise the Twilio client
var client = new twilio.RestClient(keys.pub, keys.sec);
//Parse requests
var url = require('url');

var codeOne = new authZero(keys.key1, 6).now();
var codeTwo = new authZero(keys.key2, 6).now();

http.createServer(function (req, res) {
	if(url.parse(req.url, true).query.Body){
		if (url.parse(req.url, true).query.Body.toLowerCase() == keys.password1) {
		  	res.writeHead(200, {'Content-Type': 'text/xml'});
			res.write("<Response>\n");
			res.write("<Message>\n");
			res.write("Your authentication code is: " + codeOne);
			res.write("</Message>");
			res.write("</Response>");
			res.end();
		}
		else if (url.parse(req.url, true).query.Body.toLowerCase() == keys.password2) {
			res.writeHead(200, {'Content-Type': 'text/xml'});
			res.write("<Response>\n");
			res.write("<Message>\n");
			res.write("Your authentication code is: " + codeTwo);
			res.write("</Message>");
			res.write("</Response>");
			res.end();
		}
	}
	else if (url.parse(req.url, true).path == "/" + keys.password1 || url.parse(req.url, true).path == "/" + keys.password2 ) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write("<h1>Google:" + codeOne +"<br>");
		res.write("Facebook:"+ codeTwo +"</h1>")
		res.end();
	}
	else {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		client.sendSms({
			to:keys.to,
		    	from:keys.from,
		    	body:'Google: ' + codeOne + '\nFacebook: ' + codeTwo
		}, 
		function(error, message) {
		    if (!error) {
		        	console.log('Message sent on:');
		        	console.log(message.dateCreated);
		        	res.write("Sent authentication code to your phone.");
		    } else {
		        	console.log('Oops! There was an error.');
		        	res.write("There was an error.");
		    }
		res.end();
		});
	}
}).listen(process.env.OPENSHIFT_NODEJS_PORT || 80, process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');