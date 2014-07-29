The Babelfish
=============

Communicate in a foreign language by text message.

VERSION 0.0.9

## Summary

Babelfish bridges the gap between people separated by differing spoken
language. It was created as a pilot for the American public school system,
allowing school staff to communicate with the parent's of children when
a common language or translator was not available.

An enterprising young woman or man could make a living on this software.
For reals.


## Instructions for Use

Once installed on a web server (see instructions below), use a web browser
to access the application. A list of conversations will be given.
Begin be creating a new conversation by typing in a name of a contact
(e.g. David's Mother), a telephone number, and selecting a
destination language to translate to and from (e.g. Spanish).
Finally, click **Add**.

Click on the name of the new room to enter it.

When you type a message in the message entry line, it will be
translated using Google Translate and sent as an SMS to the destination
telephone number. When the recipient of the message responds, their
response will be automatically translated into English.


## Installation

### Configure Twilio:

Babefish uses Twilio for SMS access.

1. Create an account at [Twilio](http://twilio.com)

2. On your server, set the following environment variables:
```bash
TWILIO_ACCOUNT_SID = #Twilio account SID
TWILIO_AUTH_TOKEN = #Twilio authentication token
TWILIO_FROM = #Your Twilio telephone number (e.g. "+16125551212")
```

3. On the Twilio dashboard, configure received SMS messages to
   be sent to http(s)://your.server.host/twiml

**NOTE:** in order for the application to receive SMS
messages from users, the server must be hosted publicly as
the Twilio API expects to call a public URL.

### Configure Google Translate API

Babelfish uses Google's Translate API for language translation support.

1. Login to your Google API dashboard.

2. Sign up for a paid Google API account by registering a credit card
   number (Translate API is not free).

3. Configure Google's API authentication to use a simple token and
   configure it to be accessible by your server's IP address or IP
   address range.

4. On your server, set the following environment variables:
```bash
GOOGLE_SERVER_KEY = your Google access token
```


## Configure Babelfish:

1. Edit config/connections.js and configure one or more of the
   database connection adapters to match your database configuration.
   Alternatively, verify that the environment variables set by your
   server will import the appropriate settings within this file.

2. Edit config/models.js to use the database connection specified
   from config/connections.js

3. Fetch all node modules using npm:
```bash
$ npm install
```

4. Fetch all bower modules:
```bash
$ bower install
```

5. Run on server:
```bash
$ node app.js
```


## Technical Notes

Babelfish is based on the excellent [Sails](http://sailsjs.org)
full-stack Javascript MVC framework and AngularJS.

All the client-side action kicks off from assets/js/app.js.

The server-side action is run from app.js, but config/routes.js
plus api/controllers/*.js will give you the best entry point to
the backend action.

Babelfish's realtime updates use websockets. The browser loads
the Sail's io module and makes it available to AngularJS using
sails.io.js

See assets/js/controllers.js for implementation.

Because this application uses Websockets, make certain your
hosting platform supports them. If using Heroku, you will
explicitly need to enable them.

## License

Babelfish is:

   (c) 2014, Communities in Schools
   (c) 2014, Jordan Husney <jordan.husney@undercurrent.com>

It is provided under the Creative Commons Attribution
Non-Commercial 4.0 International License. For more information see:

   http://creativecommons.org/licenses/by-nc/4.0/


## Limitations & Feature Backlog

Babelfish was developed as a technical demonstration. It is not
yet architected for production use. Some limitations
(opportunities!) for improvement are given below:

 - Conversation controller presently retrieves all conversations
   *and* all messages for each conversation. This this should be
   made a lazy operation as to not overwhelm the /conversations page

 - There is no authentication of any sort. As a result, this app is
   not yet suitable for public deployment

 - The messages list in the /converse/ view does not automatically
   scroll to the bottom. It can be difficult to tell when new
   messages have arrived

 - Styling is *uggers.* The app could be made much more pretty with
   a little styling love


## Miscellaneous

The Babelfish name is an homage to the now defunct Altavista
machine translation service (which, in turn was named for
the curious translating fish from Douglas's Adams *Hitchhiker's
Guide to the Galaxy*).
