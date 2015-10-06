/// <reference path="dashboard.ts" />
/// <reference path="../services/submit-toggle-feedback.ts" />

'use strict';

module labsFrontendApp {

    export interface FormScope extends IDashboardScope {
        formData:any;
        formDataArray: any;
        showValidationMessages: any;
        submitted :any;
        processForm: any;
        clearForm: any;
    }

    export class PreviewFeedbackFormCtrl {
        // @ngInject
        constructor(private $scope:FormScope, private submitFeedback: SubmitToggleFeedback) {

            //empty object and empty array to hold the form data
            $scope.formData = {};
            $scope.formDataArray = [];
            $scope.message = {};
            $scope.message.success = false;//don't show message on form load//not working
            $scope.showValidationMessages = false;
            $scope.showValidationMessages = false;
            $scope.processForm = (chosenFeature, formData, isValid) => {
                this.submitForm(chosenFeature, formData, isValid);
            }

            this.$scope.hideSuccessMessage = ()  => {
                this.$scope.message.success= false;//hide message if user wants to write/submit more feedback
            };
        }

        submitForm(chosenFeature, formData, isValid) {
            this.$scope.submitted = true;
            if (isValid) {
                this.submitFeedback.execute(chosenFeature.id, formData);
                this.clearForm(true);
            }
            else {
                this.$scope.showValidationMessages = true;
                this.$scope.message.success = false;//show success message

            }
        }

        clearForm = (successMessage: boolean)  => {
            this.$scope.message.success = successMessage;//hide message if user wants to write/submit more feedback
            this.$scope.showValidationMessages = false;
            this.$scope.formData = {};//empty form fields
        };


    }
}










