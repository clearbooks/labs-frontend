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
        $scope.features = [
            {name: 'feature one - test'},
            {name: 'feature two', notAnOption: true},
            {name: 'feature three'},
            {name: 'feature four'},
            {name: 'feature five'},
            {name: 'feature six'}

        ]
        //this needs to be passed in form DashBoard Ctrl
        $scope.myFeature = $scope.features[2];
        /* $scope.pickedFeature = function(test) {
         //alert(test);
         };*/
    }


    ]);






