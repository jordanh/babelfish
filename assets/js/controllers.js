'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', '$sails', function($scope, $sails) {
    $scope.conversations = ["static bar"];

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
  .controller('MyCtrl2', [function() {

  }]);
