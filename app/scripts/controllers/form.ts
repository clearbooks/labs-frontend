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

        //empty object and empty array to hold the form data
        $scope.formData = {};
        $scope.formDataArray = [];
        $scope.$parent.successMessage = false;//don't show message on page load
        $scope.showValidationMessages = false;


        $scope.processForm = function( chosenFeature, formData, isValid ) {



            console.log(chosenFeature, formData);
            console.log("feature is: " + chosenFeature.title + " mood: " +  formData.mood + " message: " + formData.message);


            $scope.submitted = true;
            //$scope.$parent.successMessage = true;//show message
            //$scope.formData = {};//this should empty form fields

            if (isValid) {
                 // alert('our form is amazing');
                 $scope.showValidationMessages = false;
                $scope.formData = {};//this should empty form fields
                $scope.$parent.successMessage = true;//show message
                }

            else {

                $scope.showValidationMessages = true;
                $scope.$parent.successMessage = false;//show message

            }

            //pass data to php for processing
            /*$http({
                method  : 'POST',
                url     : 'send-mail.php',
                data    : $.param( $scope.formData ),
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                //if successful
                .success(function(data) {
                    console.log(data);

                    //push form data to array
                    $scope.formDataArray.push(formData);
                    $scope.formData = {};//this should empty form fields
                    $scope.featuresFeedback.$setPristine();
                    //test
                    alert('message sent');
                    $scope.submission = true; //show success message

                });*/

        };

        $scope.hideSuccessMessageOnFocus = function(){
            $scope.$parent.successMessage = false;//hide message if user wants to write/submit more feedback
        }

       /* $scope.submitform = function () {*/
       /*     $scope.submitted = true;*/
       /*     //$scope.showValidationMessages = true;*/
       /*     $scope.featuresFeedback.$setPristine();*/
       /*     $scope.formData = {};*/
       /*     $scope.form.$setValidity();*/
/*
*/

       /*     return false;*/
       /* }*/
/*
*/


    }]);







