// Input for city

'use strict';

// Module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// Routes
weatherApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/views/home.html',
      controller: 'homeController'
    })
    .when('/forecast', {
      templateUrl: '/views/forecast.html',
      controller: 'forecastController'
    })
}]);

// Controllers
weatherApp.controller('homeController', ['$scope', function ($scope) {
  console.log('home controller');
}]);

weatherApp.controller('forecastController', ['$scope', function ($scope) {
  console.log('forecast controller');
}]);
