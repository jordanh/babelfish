'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngSails',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).

config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/conversations',
                      {templateUrl: 'partials/conversations.html',
                       controller: 'ConversationsCtrl'});
  $routeProvider.when('/converse/:id',
                    {templateUrl: 'partials/converse.html',
                     controller: 'ConverseCtrl'});
  $routeProvider.when('/view1', {templateUrl: 'partials/view1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/conversations'});
}]);
