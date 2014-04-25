/**
* Message.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var getRoomName = function(id) {
  return 'Message/' + id;
};

module.exports = {

  attributes: {
  	isFromPhone: 'boolean',
    body: 'string',
    translation: 'string',

  	conversation: {
      model: 'conversation'
    }
  },

  /**
   * Publish messages to all of the WebSockets who have called
   * subscribeMessageUpdates for a given conversationId.
   *
   * @param  {object} Message object
   * @param  {object} Asynchronous callback
   */
  afterCreate: function(message, cb) {

    var roomName = getRoomName(message.conversation);

    _.each(sails.sockets.subscribers(roomName), function(id) {
      sails.sockets.emit(id, roomName, {
        verb: "create",
        data: message
      });
    });

    cb();
  },


  /**
   * Subscribe to newly created messages for a given conversation id.
   *
   * A room is created called "Message/{conversationId}" and the socket
   * is subscribed to it.
   *
   * @param   {object} req.socket object
   * @param  {integer} a given conversation id
   */
  subscribeMessageUpdates: function(socketObj, conversationId) {

    var roomName = getRoomName(conversationId);
    var socketId = sails.sockets.id(socketObj);

    sails.sockets.join(socketObj, roomName);
    sails.sockets.emit(socketId, roomName, {
      verb: "info",
      data: "subscribed to " + roomName
    });
  }
};
