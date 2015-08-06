/// <reference path="../app.ts" />

'use strict';

module labsFrontendApp {
  export interface IDashboardScope extends ng.IScope {

  }

  export class DashboardCtrl {
    // @ngInject
    constructor (private $scope: IDashboardScope) {

    }
  }
}

var labsFrontendApp = angular.module('labsFrontendApp', []);

labsFrontendApp.controller('DashboardCtrl', function ($scope) {

  $scope.sections = [
    {
      id: '1',
      title: "First feature"
    },
    {
      id: '2',
      title: "Second feature"
    }
  ];

  $scope.section = 'test';

});

labsFrontendApp.controller('ItemController', ['$scope', function ($scope) {
  $scope.features = [
    {name: 'feature one'},
    {name: 'feature two', notAnOption: true},
    {name: 'feature three'},
    {name: 'feature four'},
    {name: 'feature five', notAnOption: false},
    {name: 'feature six'}
  ];
  $scope.myFeature = $scope.features[2];
}]);



/*original code below*/

/*angular.module('labsFrontendApp')
    .controller('DashboardCtrl', labsFrontendApp.DashboardCtrl);*/

/*
angular.module('labsFrontendApp')
    .controller('MainSelectCtrl', ['$scope', function($scope) {
      $scope.features = [
        {name:'feature one'},
        {name:'feature two',  notAnOption: true},
        {name:'feature three'},
        {name:'feature four'},
        {name:'feature five', notAnOption: false},
        {name:'feature six'}
      ];
      $scope.myFeature = $scope.features[2];
    }]);
*/





