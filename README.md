TOTP-Twilio
===========

A TOTP implementation with the Twilio REST API!
##This project mainly references other modules which I have combined to produce this really basic script which performs two actions:
1. If a user visits the page with DoNotTrack enabled, it will send a message to your mobile containing a two-factor authentication code based on your secret.
2. If you upload this code to a web server and upload it as a TwiML app, it will respond to requests with a two-factor authentication code.

I made this mainly to solve a problem that I was afraid of: Forgetting my mobile phone and being locked out of my accounts. This project should eliminate that fear, as the codes can be retrieved from any device or mobile phone.

#Prerequisites 
- A free Twilio account
- Somewhere to host the script
- A Google Authenticator secret

#Usage
1. Add all the files to the root of your server
2. Create a config.js file based on the example given
3. Add your server's domain as a [TwiML app](https://www.twilio.com/user/account/apps) in your Twilio account
4. Send a text message to you Twilio number with your configured password as the body
5. Receive your Two-factor auth code

#Future Development
- Support for multiple auth accounts
- Better protection against random requests
- Better user feedback
