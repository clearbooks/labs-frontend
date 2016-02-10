/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../app/scripts/controllers/form.ts" />
/// <reference path="../../mock/services/submit-toggle-feedback.ts" />

'use strict';
module labsFrontendApp
{
    describe('Controller: PreviewFeedbackFormCtrl', () => {

        // load the controller's module
        var submitToggleFeedbackSpy: SubmitToggleFeedbackSpy;
        var feedbackFormCtrl: PreviewFeedbackFormCtrl;
        var rootScope: ng.IRootScopeService;

        var scope = {
            formData: undefined,
            formDataArray: undefined,
            showValidationMessages: undefined,
            submitted: undefined,
            processForm: undefined,
            releases: undefined,
            feature: undefined,
            message: undefined,
            feature_sections: undefined,
            user_features: undefined,
            group_features: undefined,
            hideSuccessMessage: undefined,
            pickedFeature: undefined,
            activated: undefined,
            autoSubscribed: undefined,
            groups: undefined,
            clearForm: undefined,
            showUserFeatures: undefined,
            gotUserFeatures: undefined,
            gotGroupFeatures: undefined,
        };

        // Initialize the controller and a mock scope
        beforeEach( inject( ( $q: ng.IQService, $rootScope: ng.IRootScopeService ) => {
            submitToggleFeedbackSpy = new SubmitToggleFeedbackSpy();
            feedbackFormCtrl = new PreviewFeedbackFormCtrl( scope, submitToggleFeedbackSpy);
            rootScope = $rootScope;
        } ) );

        it('should send the correct details to the SubmitToggleFeedback when valid', () =>{
            rootScope.$apply();

            var chosenFeature = {id: 1};
            var formData = {name: "Crimmy D"};
            var isValid = true;

            feedbackFormCtrl.submitForm(chosenFeature, formData, isValid);

            expect(submitToggleFeedbackSpy.getToggleId()).toEqual(chosenFeature.id);
            expect(submitToggleFeedbackSpy.getFormDataEntered()).toEqual(formData);
        });

        it('should set message.success to false on the scope when calling submitForm with not valid', () => {
            rootScope.$apply();

            var chosenFeature = {};
            var formData = {};
            var isValid = false;

            feedbackFormCtrl.submitForm(chosenFeature, formData, isValid);
            expect(scope.message.success).toBeFalsy();
            expect(submitToggleFeedbackSpy.getFormDataEntered()).toBeUndefined();
            expect(submitToggleFeedbackSpy.getToggleId()).toBeUndefined();
        });

        it('should set message.success to true and clear the form when clearForm is called with true', () => {
            rootScope.$apply();
            scope.formData = {message: "Quack"};
            feedbackFormCtrl.clearForm(true);
            expect(scope.message.success).toBeTruthy();
            expect(scope.formData).toEqual({});
        });

        it('should set message.success to false and clear the form when clearForm is called with false', () => {
            rootScope.$apply();
            scope.formData = {message: "Quack"};
            feedbackFormCtrl.clearForm(false);
            expect(scope.message.success).toBeFalsy();
            expect(scope.formData).toEqual({});
        });
    });

}


