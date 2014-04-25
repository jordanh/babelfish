/**
 * ConversationController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  subscribe: function(req, res) {
    Conversation.find(function (err, messages) {
      if (err) return next(err);

      // subscribe to model class room:
      Conversation.subscribe(req.socket);

      res.send(200);
    });
  },

  subscribe_messages: function(req, res) {
    var conversationId = req.param('id');

    Message.subscribeMessageUpdates(req.socket, conversationId);

    res.send(200);
  },

  send_message: function(req, res) {
    var conversationId = req.param('id');

    msg = {
      isFromPhone: false,
      body: req.param('message')
    };

    Conversation.findOne(conversationId).exec(function (e, c) {
      var langMap = { target: c.language };
      TranslateService.translate(msg.body, langMap, function(e, t) {
        msg.translation = t.translatedText;

        /* store the translated message in the model: */
        c.messages.add(msg);
        c.save();

        /* send the translated message via SMS: */
        TwilioService.sendMessage(c.phoneNumber, msg.translation);
      });
    });

    res.send(200);
  },

  /*
   * N.B. Bound to route /twiml
   */
  post_from_twilio: function(req, res) {
    /*
    for(var item in req.headers) {
        console.log("H [" + item + "]: " + req.headers[item]);
    }

    for (var item in req.body) {
      console.log("B [" + item + "]: " + req.body[item]);
    }
    */

    msg = {
      isFromPhone: true,
      body: req.body.Body,
      translation: ''
    };

    Conversation.findOne({phoneNumber: req.body.From})
      .exec(function (err, found) {
        /* translate to english: */
        var langMap = { source: found.language, target: 'en' };
        TranslateService.translate(req.body.Body, langMap, function (e, t) {
          msg.translation = t.translatedText;
          found.messages.add(msg);
          found.save();

          TwilioService.requestResponse(res);
        });
    });
  }
};
