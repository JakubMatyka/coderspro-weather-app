'use strict';

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