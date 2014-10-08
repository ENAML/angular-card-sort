'use strict';

angular.module('codeTestApp')
  .controller('MainCtrl', function ($scope,$http) {

    // instantiate groups
    $scope.lectures = [];
    $scope.shows = [];
    $scope.awardNominees = [];

    // get data from JSON file
    $http.get('front_end_demo.json').success(function(json){
      var items = json.data;

      //sort items into groups
      var i = 0;
      for (i; i < items.length; i++) {
        if (items[i].subType === 'Lecture') {
          $scope.lectures.push(items[i]);
        } else if (items[i].subType === 'Show') {
          $scope.shows.push(items[i]);
        } else if (items[i].subType === 'Award Nominee') {
          $scope.awardNominees.push(items[i]);
        }
      }
    }).error(function() {
      console.log('uh oh');
    });

    // moves item in one of the groups from previous location to top/front
    $scope.toTop = function(item, arr) {
      var i = arr.indexOf(item);
      arr.splice(i,1);
      arr.unshift(item);
    };

  });
