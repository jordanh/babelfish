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

  post_from_twilio: function(req, res) {
    msg = {
      isFromPhone: true,
      body: req.body.Body
    };

    Conversation.findOne(1).exec(function (e, r) {
      r.messages.add(msg);
      r.save(console.log);
      
      TwilioService.requestResponse(res);
    });
  }
};
