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
       //inherits from the dashboard controller

    }

    ]);






