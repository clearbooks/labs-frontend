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
        /*$scope.features = [
            {name: 'feature one - test'},
            {name: 'feature two', notAnOption: true},
            {name: 'feature three'},
            {name: 'feature four'},
            {name: 'feature five'},
            {name: 'feature six'}

        ]*/



       // $scope.myFeature = $scope.features[1];


        $scope.parenttestfeatures = $scope.$parent.$parent.testfeatures;

        $scope.myFeature = $scope.$parent.$parent.myFeature;
        //console.log($scope.myFeature.name);

    }


    ]);






