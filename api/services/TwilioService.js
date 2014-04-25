twilio = require("twilio");

var config = { };

// prod/heroku
if (process.env.TWILIO_ACCOUNT_SID) {
    config.accountSid = process.env.TWILIO_ACCOUNT_SID;
    config.authToken = process.env.TWILIO_AUTH_TOKEN;
}

// local dev
else {
    local_config = require('../../config/local');
    config = local_config["twilio"];
}

exports.validateRequest = function(req) {
  return twilio.validateExpressRequest(req, config.authToken);
};

exports.requestResponse = function(res) {
  var twiml = new twilio.TwimlResponse();
  res.type('text/xml');
  res.send(twiml.toString());
};
