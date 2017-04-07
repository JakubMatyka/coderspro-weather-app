'use strict';

angular.module('weatherApp').controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {
  $scope.city = cityService.city;

  $scope.$watch('city', function () {
    cityService.city = $scope.city;
  })
}]);


angular.module('weatherApp').controller('forecastController', ['$scope', '$resource', '$log', '$routeParams', 'cityService',
  function ($scope, $resource, $log, $routeParams, cityService) {
    $scope.city = cityService.city;
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
