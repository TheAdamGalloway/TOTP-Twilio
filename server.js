//Require the keys
var keys = require('./config.js');
//Require the Twilio REST API
var twilio = require('twilio');
//Require the onceler module
var auth = require('onceler').TOTP;
//Initialise the HTTP server
var http = require('http');
//Initialise the Twilio client
var client = new twilio.RestClient(keys.pub, keys.secret);
//Parse requests
var url = require('url');

function code (i) {
	if (i == 1) {
		return new auth(keys.key1, 6).now();
	}
	else if (i == 2) {
		return new auth(keys.key2, 6).now();
	}
	
}

http.createServer(function (req, res) {
	if(url.parse(req.url, true).query.Body){
		if (url.parse(req.url, true).query.Body.toLowerCase() == keys.password1) {
		  	res.writeHead(200, {'Content-Type': 'text/xml'});
			res.write("<Response>\n");
			res.write("<Message>\n");
			var codeOne = code(keys.key1);
			res.write("Your authentication code is: " + code(1));
			res.write("</Message>");
			res.write("</Response>");
			res.end();
		}
		else if (url.parse(req.url, true).query.Body.toLowerCase() == keys.password2) {
			res.writeHead(200, {'Content-Type': 'text/xml'});
			res.write("<Response>\n");
			res.write("<Message>\n");
			res.write("Your authentication code is: " + code(2));
			res.write("</Message>");
			res.write("</Response>");
			res.end();
		}
	}
	else if (url.parse(req.url, true).path == "/" + keys.password1 || url.parse(req.url, true).path == "/" + keys.password2 ) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write("<h1>Google:" + code(1) +"<br>");
		res.write("Facebook:"+ code(2) +"</h1>");
		client.sendSms({
			to:keys.to,
		    	from:keys.from,
		    	body:'Google: ' + code(1) + '\nFacebook: ' + code(2)
		}, 
		function(error, message) {
		    if (!error)
		     {
		        	console.log('Message sent on:');
		        	console.log(message.dateCreated);
		        	res.write("Sent authentication code to your phone.");
		    }
		    else {
		        	console.log('Oops! There was an error.');
		        	res.write("There was an error.");
		    }
		});
		res.end();
	}
	else  {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write("There was an error.")
		res.end();
		});
	}
}).listen(process.env.OPENSHIFT_NODEJS_PORT || 80, process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');