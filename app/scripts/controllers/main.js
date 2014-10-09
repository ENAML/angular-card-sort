'use strict';

angular.module('codeTestApp')
  .controller('MainCtrl', function ($scope,$http) {

    $scope.groups = {};

    // get data from JSON file
    $http.get('front_end_demo.json').success(function(json){
      var items = json.data;

      // go through items in JSON
      for (var i = 0; i < items.length; i++) {
        var subType = items[i].subType;

        // if subType exists in groups already, push item into subType group
        // if not, create an array with subType name and push item into that
        if ($scope.groups.hasOwnProperty(subType)) {
          $scope.groups[subType].push(items[i]);
        } else {
          $scope.groups[subType] = [];
          $scope.groups[subType].push(items[i]);
        }
      }
      console.log($scope.groups);

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
