// City name in scope for both pages
// Bind text box to the scope and share data between views - create service

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
// Inject service
weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {
  $scope.city = cityService.city;

  // bound value of scope city to watcher
  $scope.$watch('city', function () {
    cityService.city = $scope.city;
  })
}]);

weatherApp.controller('forecastController', ['$scope', 'cityService', function ($scope, cityService) {
  $scope.city = cityService.city;
}]);
