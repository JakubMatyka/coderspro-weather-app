// Home page with input where we can place city name so we can get some forecast for next days
// Two pages using routing

'use strict';

// Add dependency of angular route and angular resource so we can use them
// The ngRoute module provides routing and deeplinking services and directives for AngularJS apps.
// The ngResource module provides interaction support with RESTful services via the $resource service.
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
