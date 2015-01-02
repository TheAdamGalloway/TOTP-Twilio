TOTP-Twilio
===========

A TOTP implementation with the Twilio REST API!
#This project mainly references other modules which I have combined to produce this really basic script which performs two actions:
1. If a user visits the page with DoNotTrack enabled, it will send a message to your mobile containing a two-factor authentication code based on your secret.
2. If you upload this code to a web server and upload it as a TwiML app, it will respond to requests with a two-factor authentication code.

I made this mainly to solve a problem that I was afraid of: Forgetting my mobile phone and being locked out of my accounts. This project should eliminate that fear, as the codes can be retrieved from any device or mobile phone.
