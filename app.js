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
    // Define if we want to use it as an element or attribute
    restrict: 'E',
    // Define which template ot should use
    templateUrl: 'directives/weatherReport.html',
    // Say if in DOM directive should replace my directive or show in bracets like <directive></directive>
    replace: true,
    // Decide if you want to isolate the scope - optional but be careful if you don`t
    // As we pass some data as an object "w" through ng-repeat
    scope: {
      weatherDay: "=",
      // For functions always use "&" - expression binding
      convertToStandard: '&',
      convertToDate: "&",
      // One way binding
      dateFormat: "<"
    }
  }
});