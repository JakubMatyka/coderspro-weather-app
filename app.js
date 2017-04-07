// Now we are gonna get data from server through ngResource.
// $resource service wraps up $http service and depends on it as well as on $q, $log, $timeout
// A factory which creates a resource object that lets you interact with
// RESTful (Representational State Transfer) server-side data sources.
// https://docs.angularjs.org/api/ngResource/service/$resource

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
  this.city = 'Gdansk';
});

// Controllers
weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {
  $scope.city = cityService.city;

  $scope.$watch('city', function () {
    cityService.city = $scope.city;
  })
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$log', 'cityService',
  function ($scope, $resource, $log, cityService) {
    $scope.city = cityService.city;

    var weatherApi = $resource("http://api.openweathermap.org/data/2.5/forecast/daily");

    $scope.weatherResult = weatherApi.get({
      q: $scope.city,
      cnt: 2,
      appid: 'b1caa2dca3aa00378b971211de73bdbf'
    }).$promise.then(function (data) {
      $log.info(data);
    });
  }]);
