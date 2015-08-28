/// <reference path="../../../app/scripts/controllers/dashboard.ts" />
/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../mock/services/get-all-public-releases.ts" />
/// <reference path="../../mock/services/get-toggles-for-release.ts" />

'use strict';
module labsFrontendApp
{
    describe('Controller: DashboardCtrl', () => {

        // load the controller's module
        var dashboardCtrl: DashboardCtrl;
        var toggleSpy: GetTogglesForReleaseSpy;
        var rootScope: ng.IRootScopeService;

        var scope = {
            releases: undefined,
            feature: undefined,
            message: undefined,
            feature_sections: undefined,
            hideSuccessMessage: undefined,
            pickedFeature: undefined
        };

        // Initialize the controller and a mock scope
        beforeEach( inject( ( $q: ng.IQService, $rootScope: ng.IRootScopeService ) => {
            toggleSpy =  new GetTogglesForReleaseSpy( $q );
            dashboardCtrl = new DashboardCtrl( scope, new GetAllPublicReleasesStub( $q ), toggleSpy );
            rootScope = $rootScope;
        } ) );

        it('should grab releases then get toggles for release ID 1', () =>
        {
            rootScope.$apply();
            expect( scope.releases ).toEqual( [GetAllPublicReleasesStub.getStubRelease()] );
            expect( toggleSpy.getReleaseId() ).toBe( 1 );
        } );
    });

}


