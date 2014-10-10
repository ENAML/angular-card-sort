'use strict';

angular
  .module('codeTestApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'angular.filter'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .filter('rowSort', function(){
    return function(groups, columns) {

      var rows = [];
      var rowCounter = 0;
      rows[rowCounter] = [];

      var columnCounter = 0;

      for (var i = 0; i < groups.length; i++) {
        if (columnCounter < columns) {
          rows[rowCounter].push(groups[i]);
          columnCounter++;
        } else {
          rowCounter++;
          rows[rowCounter] = [];
          rows[rowCounter].push(groups[i]);
          columnCounter = 0;
          columnCounter++;

        }
      }


      return rows;
    };
  });
