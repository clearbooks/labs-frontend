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

//in progress as need to set up the sending of the data once back end is set up..
angular.module('labsFrontendApp')
    .controller('PreviewFeedbackFormCtrl', ['$scope', function ($scope, $http) {

        //empty object and empty array to hold the form data
        $scope.formData = {};
        $scope.formDataArray = [];
        $scope.message.success = false;//don't show message on form load//not working
        $scope.showValidationMessages = false;


        $scope.processForm = function( chosenFeature, formData, isValid ) {

            console.log(chosenFeature, formData);
            console.log("feature is: " + chosenFeature.title + " mood: " +  formData.mood + " message: " + formData.message);


            $scope.submitted = true;

            if (isValid) {

                $scope.showValidationMessages = false;
                $scope.message.success = true;//show success message
                $scope.formData = {};//empty form fields
                }

            else {

                $scope.showValidationMessages = true;
                $scope.message.success = false;//show success message

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


    }]);







