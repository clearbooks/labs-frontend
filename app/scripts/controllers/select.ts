/// <reference path="../app.ts" />

'use strict';

module labsFrontendApp {
    export interface IDashboardScope extends ng.IScope {

    }

    export class SelectCtrl {
        // @ngInject
        constructor (private $scope: IDashboardScope) {

        }
    }
}

angular.module('labsFrontendApp')
    .controller('SelectCtrl', ['$scope', function ($scope) {
        //the following was moved to the dashboard and is inherited from there..
        /*$scope.features = [
            {name: 'feature one - test'},
            {name: 'feature two', notAnOption: true},
            {name: 'feature three'},
            {name: 'feature four'},
            {name: 'feature five'},
            {name: 'feature six'}

        ]*/


       // $scope.myFeature = $scope.features[1];
        //$scope.parenttestfeatures = $scope.$parent.$parent.testfeatures;
       // $scope.myFeature = $scope.$parent.$parent.myFeature;

        //this works but does not successfully pass to the ng-init value on teh select dropdown
        //console.log($scope.myFeature.title);


    }


    ]);






