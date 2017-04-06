// sign up to http://openweathermap.org/appid
// Each time we will send request for some data we will need to append our id to url
// For example:
// http://api.openweathermap.org/data/2.5/forecast/daily?APPID=YOURAPIKEY
// Address for API for forecast for next 5 days
// https://openweathermap.org/forecast5

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

// Services
weatherApp.service('cityService', function () {
  this.city = 'Gdańsk, GD';
});

// Controllers
weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {
  $scope.city = cityService.city;

  $scope.$watch('city', function () {
    cityService.city = $scope.city;
  })
}]);

weatherApp.controller('forecastController', ['$scope', 'cityService', function ($scope, cityService) {
  $scope.city = cityService.city;
}]);
