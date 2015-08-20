/// <reference path="../app.ts" />

'use strict';

module labsFrontendApp {
    export interface IDashboardScope extends ng.IScope {

    }

    export class PreviewFeedbackFormCtrl {
        // @ngInject
        constructor(private $scope:IDashboardScope) {

        }
    }
}

//in progress
angular.module('labsFrontendApp')
    .controller('PreviewFeedbackFormCtrl', ['$scope', function ($scope, $http) {

        $scope.formData = {};


        $scope.processForm = function( chosenFeature, formData ) {

            console.log(chosenFeature, formData);

            $http({
                method  : '',
                url     : '',
                data    : $.param( formData ),
                headers : { 'Content-Type': '' }
            })
                .success(function(data) {
                    console.log(data);

                });
        };

    }


    ]);







