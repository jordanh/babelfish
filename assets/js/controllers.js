'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('ConversationsCtrl', ['$scope', '$sails', function($scope, $sails) {
    $scope.conversations = [ ];

    (function () {
      $sails.get("/conversation/subscribe")
        .error(function (data) {
          alert("Unable to subscribe to conversation.");
        });

      $sails.get("/conversation")
        .success(function (data) {
          $scope.conversations.push.apply($scope.conversations, data);
        })
        .error(function (data) {
          alert("Houston, we have a problem!");
        });
      $sails.on("message", function (message) {
        if (message.verb === "create") {
          $scope.conversations.push(message.data);
        }
      });
    }());
  }])

  .controller('ConversationItemCtrl', ['$scope', '$sails', function($scope, $sails) {
    $scope.form = (typeof $scope.form === 'undefined') ? { } : $scope.form;
    $scope.submitButtonText = "";

    $scope.setDefaults = function() {
      if ('id' in $scope.form && $scope.form.id != null) {
        $scope.submitButtonText = "Update";
      }
      else {
        $scope.submitButtonText = "Create";
        $scope.form.language = "es";
      }
    };

    $scope.resetForm = function() {
      $scope.form = { };
      $scope.setDefaults();
    };

    $scope.submitForm = function(formNg) {
      if ('id' in $scope.form && $scope.form.id != null) {
        // update conversation
        $sails.put("/conversation/" + $scope.form.id,
                    $scope.form, function (res) {
          // TODO: some error checking should go here.
          formNg.$setPristine();
        });
      }
      else
      {
        // new conversation
        $sails.post("/conversation/create", $scope.form, function (res) {
          // TODO: some error checking should go here.
          $scope.form.id = res.id
          $scope.conversations.unshift($scope.form);
          $scope.resetForm();
        });
      }
    };

    $scope.delete = function(i) {
      $sails.delete("/conversation/" + $scope.form.id, function (res) {
        $scope.conversations.splice(i, 1);
      });
    };

    (function () {
      $scope.setDefaults();
    })();

  }])

  .controller('ConverseCtrl', ['$scope', '$routeParams', '$sails',
              function($scope, $routeParams, $sails) {
    $scope.conversation = { };
    $scope.message;

    (function () {
      var roomName = "Message/" + $routeParams.id;

      $sails.get("/conversation/" + $routeParams.id)
        .success(function (res) {
          $scope.conversation = res;
        });

      $sails.get("/conversation/subscribe/" + $routeParams.id)
        .success(function (res) {
        });
      $sails.on(roomName, function (message) {
        if (message.verb === "create") {
          $scope.conversation.messages.push(message.data);
        }
      });
    }());

    $scope.sendMessage = function(message) {
      $sails.post("/conversation/send/" + $routeParams.id,
                  { message: $scope.message })
        .success(function (res) {
          $scope.message = "";
        });
    }

    $scope.messageClass = function(message, styles) {
      if (styles === undefined) {
        styles = '';
      }
      if (message.isFromPhone) {
        return "pull-left " + styles;
      }
      else
      {
        return "pull-right " + styles;
      }
    }
  }])

  .controller('MyCtrl2', [function() {

  }]);
