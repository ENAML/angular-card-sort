'use strict';

angular.module('codeTestApp')
  .controller('MainCtrl', function ($scope,$http) {


    // TODO: Separate groups into Angular Service (?)
    $scope.groups = {}; //hashtable version
    $scope.groupsArray = []; // need for filtering into rows
    $scope.groupsSortedByRow = [];
    $scope.columns = 2; // max number of columns per row;


    // necessary for column filter

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

      // puts groups into groupsArray
      for (var group in $scope.groups) {
        $scope.groupsArray.push($scope.groups[group]);
      }

      console.log($scope.groupsArray);

      // Sorting into rows

      var rowCounter = 0;
      $scope.groupsSortedByRow[rowCounter] = [];

      var columnCounter = 0;

      for (var i = 0; i < $scope.groupsArray.length; i++) {
        if (columnCounter < $scope.columns) {
          $scope.groupsSortedByRow[rowCounter].push($scope.groupsArray[i]);
          columnCounter++;
        } else {
          rowCounter++;
          $scope.groupsSortedByRow[rowCounter] = [];
          $scope.groupsSortedByRow[rowCounter].push($scope.groupsArray[i]);
          columnCounter = 0;
          columnCounter++;

        }
      }

      console.log($scope.groupsSortedByRow);

    }).error(function() {
      console.log('uh oh');
    });



    // moves item in one of the groups from previous location to top/front
    $scope.toTop = function(item, group) {
      var i = group.indexOf(item);
      group.splice(i,1);
      group.unshift(item);
    };


    // TODO: separate modal into it's own controller

    $scope.modal = {
      show: false,
      name: '',
      subType: '',
      shortDescription: ''
    };

    $scope.openModal = function(item) {
      $scope.modal.name = item.name;
      $scope.modal.subType = item.subType;
      $scope.modal.shortDescription = item.shortDescription;
      $scope.modal.show = true;
    };

    $scope.closeModal = function() {
      $scope.modal.show = false;
    };

  });
