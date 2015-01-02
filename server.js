//Require the keys
var keys = require('./config.js');
//Require the Twilio REST API
var twilio = require('twilio');
//Require the onceler module
var authZero = require('onceler').TOTP;
//Initialise the onceler module
var authOne = new authZero(keys.key, 6);
//Initialise the HTTP server
var http = require('http');
//Initialise the Twilio client
var client = new twilio.RestClient(keys.pub, keys.sec);

http.createServer(function (req, res) {
	if (req.headers.Body == config.password) {
	  	res.writeHead(200, {'Content-Type': 'text/xml'});
		//res.write("<?xml>\n");
		res.write("<Response>\n");
		res.write("<Message>\n");
		res.write("Your authentication code is: " + authOne.now());
		res.write("</Message>");
		res.write("</Response>");
		res.end();
	}
	else if(req.headers.dnt == 1) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		client.sendSms({
			to:keys.to,
		    	from:keys.from,
		    	body:'Your authentication code is: ' + authOne.now()
		}, function(error, message) {
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