/**
* Conversation.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: 'string',
    phoneNumber: 'string',
    language: 'string',

    messages: {
      collection: 'message',
      via: 'conversation'
    }
  },

  beforeCreate: function (conversation, cb) {
    /* normalize the phone number before inserting in database: */
    conversation.phoneNumber = TwilioService.normalizeNumber(
      conversation.phoneNumber);

    cb();
  }
};
