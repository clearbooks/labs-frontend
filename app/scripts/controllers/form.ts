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

        /*$scope.reset = function() {
            $scope.formData.message = "";
            $scope.featuresFeedback.$setPristine();
        }*/

        /*var defaultForm = {
        message : ""
        };*/


        $scope.processForm = function( chosenFeature, formData ) {

           // console.log(chosenFeature, formData);

           // console.log("feature is: " + chosenFeature.title + " mood: " +  formData.mood + " message: " + formData.message);

            $http({
                method  : '',
                url     : '',
                data    : $.param( formData ),
                headers : { 'Content-Type': '' }
            })
                //data not getting here
                .success(function(data) {
                    console.log(data);

                    $scope.formData = {};//this should empty form fields
                    $scope.submission = true; //cerate a



                });

            /*$scope.featuresFeedback.$setPristine();
            formData.message = "";*/
        };


       // $scope.featuresFeedback.$setPristine();

    }


    ]);







