//Require the Twilio REST API
var twilio = require('twilio');
//Require the keys
var keys = require('./config.js');
//Require the onceler module
var authZero = require('onceler').TOTP;
//Initialise the onceler module
var authOne = new authZero(keys.key, 6);

//Initialise the client
var client = new twilio.RestClient(keys.pub, keys.sec);

//Send the generated code via SMS

client.sendSms({
    to:keys.to,
    from:keys.from,
    body:'Your authentication code is: ' + authOne.now()
}, function(error, message) {
    if (!error) {
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
        console.log('Oops! There was an error.');
    }
});