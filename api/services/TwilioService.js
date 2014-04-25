twilio = require("twilio");

var config = { };

// prod/heroku
if (process.env.TWILIO_ACCOUNT_SID) {
    config.accountSid = process.env.TWILIO_ACCOUNT_SID;
    config.authToken = process.env.TWILIO_AUTH_TOKEN;
    config.from = process.env.TWILIO_FROM;
}

// local dev
else {
    local_config = require('../../config/local');
    config = local_config["twilio"];
}

/*
 * Normalize a phonenumber string to +1AAABBBCCCC
 */
exports.normalizeNumber = function(number) {
  number = number.replace(/\D/g,'');
  if (number[0] == "+") {
    // all done here
    return number;
  } else {
    if (number[0] == "1") {
        return "+" + number;
    } else {
        return "+1" + number;
    }
  }
};

exports.validateRequest = function(req) {
  /* UNTESTED */
  return twilio.validateExpressRequest(req, config.authToken);
};

exports.requestResponse = function(res) {
  var twiml = new twilio.TwimlResponse();

  twiml.message("");
  res.type('text/xml');
  res.send(twiml.toString());
};

exports.sendMessage = function(number, msg) {
  var twilio = require('twilio');
  var client = new twilio.RestClient(config.accountSid,
                                     config.authToken);
  var number = exports.normalizeNumber(number);

  client.sms.messages.create({
      to:number,
      from:config.from,
      body:msg,
  }, function(error, message) {
      // The HTTP request to Twilio will run asynchronously. This callback
      // function will be called when a response is received from Twilio
      // The "error" variable will contain error information, if any.
      // If the request was successful, this value will be "falsy"
      if (error) {
      // The second argument to the callback will contain the information
      // sent back by Twilio for the request. In this case, it is the
      // information about the text messsage you just sent:
          console.log('SMS: to ' + number + ' error (' + error + ')');
      }
  });

  return number;
};
