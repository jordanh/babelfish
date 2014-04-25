# babelfish.git

VERSION 0.0.9

## Summary

Babelfish bridges the gap between people separated by differing spoken
language. It was created as a pilot for the American public school system,
allowing school staff to communicate with the parent's of children when
a common language or translator was not available.

## Instructions for Use

Once installed on a web server (see instructions below), use a web browser
to access the application. A list of conversations will be given.
Begin be creating a new conversation by typing in a name of a contact
(e.g. David's Mother), a telephone number, and destination language
to translate to and from (e.g. Spanish), and click Add.

Click on the name of the new room to enter it.

When you type a message in the message entry line, it will be
translated using Google Translate and sent as an SMS to the destination
telephone number. When the recipient of the message responds, their
response will be automatically translated into English.

## Installation

### Configure Twilio:

Babefish uses Twilio for SMS access.

1) Create an account at [Twilio](http://twilio.com)

2) On your server, set the following environment variables:

   TWILIO_ACCOUNT_SID = Twilio account SID
   TWILIO_AUTH_TOKEN = Twilio authentication token
   TWILIO_FROM = Your Twilio telephone number (e.g. "+16125551212")

### Configure Google Translate API

Babelfish uses Google's Translate API for language translation support.

1) Login to your Google API dashboard.

2) Sign up for a paid Google API account by registering a credit card
   number (Translate API is not free).

3) Configure Google's API authentication to use a simple token and
   configure it to be accessible by your server's IP address or IP
   address range.

4) On your server, set the following environment variables:

   GOOGLE_SERVER_KEY = your Google access token

## Configure Babelfish:

1) Edit config/connections.js and configure one or more of the
   database connection adapters to match your database configuration.
   Alternatively, verify that the environment variables set by your
   server will import the appropriate settings within this file.

2) Edit config/models.js to use the database connection specified
   from config/connections.js

3) Fetch all node modules using npm:

   # npm install

4) Fetch all bower modules:

   # bower install

5) Run on server:

   $ node app.js


## Technical Notes

Babelfish is based on the excellent [Sails](http://sailsjs.org)
full-stack Javascript MVC framework and AngularJS.

Babelfish's realtime updates use websockets. Sails browser socketio
handle is wrapped and made available to AngularJS using sails.io.js

See assets/js/controllers.js:

## License

Babelfish is:

   (c) 2014, Communities in Schools
   (c) 2014, Jordan Husney <jordan.husney@undercurrent.com>

It is provided under the Creative Commons Attribution
Non-Commercial 4.0 International License. For more information see:

   http://creativecommons.org/licenses/by-nc/4.0/

## Miscellaneous

Babelfish is named as an homage to the now defunct Altavista human
language auto translation service (which, in turn was named for
the curious translating fish from Douglas's Adams *Hitchhiker's
Guide to the Galaxy*).
