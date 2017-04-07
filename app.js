// Create custom directive

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

    // Create path which accepts days to dynamically get forecast for established number of days
    .when('/forecast/:days', {
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


weatherApp.controller('forecastController', ['$scope', '$resource', '$log', '$routeParams', 'cityService',
  function ($scope, $resource, $log, $routeParams, cityService) {
    $scope.city = cityService.city;

    // Fix intiger to string so ngClass works
    $scope.days = $routeParams.days || '2';

    var weatherApi = $resource("http://api.openweathermap.org/data/2.5/forecast/daily");

    $scope.weatherResult = weatherApi.get({
      appid: 'b1caa2dca3aa00378b971211de73bdbf',
      q: $scope.city,
      units: 'metrics',
      cnt: $scope.days
    }, function(res) {
      return res;
    });

    $scope.convertToCelsius = function (kelvinTemperature) {
      var temp =  kelvinTemperature - 273.15;
      return temp.toFixed(1);
    };

    $scope.convertToDate = function (date) {
      return new Date(date * 1000);
    }
  }]);

// Directives
weatherApp.directive('weatherReport', function () {
  // Return directive object
  return {
    restrict: 'E',
    templateUrl: 'directives/weatherReport.html',
    replace: true,
    scope: {
      // Use one way data binding as the data will not be changed
      weatherDay: "<",
      convertToStandard: '&',
      convertToDate: "&",
      dateFormat: "<"
    }
  }
});