/// <reference path="../../../app/scripts/controllers/dashboard.ts" />
/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../mock/services/get-all-public-releases.ts" />
/// <reference path="../../mock/services/get-toggles-for-release.ts" />
/// <reference path="../../mock/services/set-toggle-active.ts" />
/// <reference path="../../mock/services/get-toggles-activated-by-user.ts" />
/// <reference path="../../mock/services/get-groups-for-user.ts" />
/// <reference path="../../mock/services/toggle-auto-subscribe.ts" />
/// <reference path="../../mock/services/get-is-auto-subscribed.ts" />

'use strict';
module labsFrontendApp
{
    describe('Controller: DashboardCtrl', () => {

        // load the controller's module
        var dashboardCtrl: DashboardCtrl;
        var userToggleSpy: GetTogglesForReleaseSpy;
        var groupToggleSpy: GetTogglesForReleaseSpy;
        var rootScope: ng.IRootScopeService;
        var userSetToggleActiveSpy: SetToggleActiveSpy;
        var groupSetToggleActiveSpy: SetToggleActiveSpy;
        var getTogglesActivatedByUserStub;
        var toggleAutoSubscribeSpy: ToggleAutoSubscribeSpy;
        var getIsAutoSubscribedStub: GetIsAutoSubscribedStub;

        var scope = {
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
            groups: undefined
        };

        // Initialize the controller and a mock scope
        beforeEach( inject( ( $q: ng.IQService, $rootScope: ng.IRootScopeService ) => {
            userToggleSpy =  new GetTogglesForReleaseSpy( $q );
            groupToggleSpy = new GetTogglesForReleaseSpy( $q );
            userSetToggleActiveSpy = new SetToggleActiveSpy();
            groupSetToggleActiveSpy = new SetToggleActiveSpy();
            toggleAutoSubscribeSpy = new ToggleAutoSubscribeSpy();
            getTogglesActivatedByUserStub = new GetTogglesActivatedByUserStub( $q );
            getIsAutoSubscribedStub = new GetIsAutoSubscribedStub($q);
            dashboardCtrl = new DashboardCtrl(
                scope, new GetAllPublicReleasesStub( $q ), userToggleSpy, groupToggleSpy,
                userSetToggleActiveSpy, groupSetToggleActiveSpy,
                getTogglesActivatedByUserStub, toggleAutoSubscribeSpy, getIsAutoSubscribedStub
            );
            rootScope = $rootScope;
        } ) );

        it('should grab releases then get toggles for release ID 41', () =>
        {
            rootScope.$apply();
            expect( scope.releases ).toEqual( [GetAllPublicReleasesStub.getStubRelease()] );
            expect( userToggleSpy.getReleaseId() ).toEqual( GetAllPublicReleasesStub.getStubRelease().id );
            expect( groupToggleSpy.getReleaseId() ).toEqual( GetAllPublicReleasesStub.getStubRelease().id );
        } );

        it('should add features correctly to feature_sections', () =>
        {
            rootScope.$apply();
            var expectedArray = [];
            expectedArray.push.apply(expectedArray, userToggleSpy.getToggles());
            expectedArray.push.apply(expectedArray, groupToggleSpy.getToggles());
            expect(scope.feature_sections).toEqual(expectedArray);
        });

        it('should get if the user is auto subscribed and set it on the scope', () =>
        {
            rootScope.$apply();
            expect(scope.autoSubscribed).toEqual(getIsAutoSubscribedStub.getStubData().autoSubscribed);
        } );

        it( 'should put activated toggles onto the scope', () =>
        {
            rootScope.$apply();
            expect( scope.activated ).toEqual( getTogglesActivatedByUserStub.getStubData() )
        } );

        it( 'should pass thru calls to userSetToggleActive to the service when called with type "simple"', () =>
        {
            dashboardCtrl.setToggleActive( 1, 'dogs', false, "simple" );
            expect(userSetToggleActiveSpy.getToggleId()).toEqual( 1 );
            expect(groupSetToggleActiveSpy.getToggleId()).toBeUndefined();
        } );

        it( 'should pass thru calls to groupSetToggleActive ot the service when called with type "group"', () =>
        {
            dashboardCtrl.setToggleActive(1, 'dogs', false, "group" );
            expect(groupSetToggleActiveSpy.getToggleId()).toEqual( 1 );
            expect(userSetToggleActiveSpy.getToggleId()).toBeUndefined();
        });

        it( 'should update the scope when setToggleActive is called', () =>
        {
            scope.activated['dogs'] = 0;
            dashboardCtrl.setToggleActive( 1, 'dogs', true, "simple");
            scope.activated['dogs'].should.equal( 1 );
        } );

        it( 'should make toggles active if they are inactive', () =>
        {
            dashboardCtrl.setToggleActive( 1, 'dogs', true, "simple" );
            userSetToggleActiveSpy.geLastActiveStatus().should.equal( true );
            scope.activated['dogs'].should.equal(1);
        } );

        it( 'should make toggles inactive if they are active', () =>
        {
            dashboardCtrl.setToggleActive( 1, 'dogs', false, "simple" );
            userSetToggleActiveSpy.geLastActiveStatus().should.equal( false );
            expect( typeof scope.activated['dogs'] ).toEqual( "undefined" );
        } );

        it( 'should set autoSubscribed to true when toggleAutoSubscribe is called', () =>
        {
            rootScope.$apply();
            dashboardCtrl.autoSubscribe();
            toggleAutoSubscribeSpy.getExecuted().should.equal(true);
            expect(scope.autoSubscribed).toEqual(!getIsAutoSubscribedStub.getStubData().autoSubscribed)
        });

        it ('should return "Preview" when toggle is not activated', () =>
        {
            var content = dashboardCtrl.getButtonContent(false);
            expect(content).toEqual("Preview");
        });

        it ('should return "Stop preview" when toggle is activated', () =>
        {
            scope.activated['cats'] = 1;
            var content = dashboardCtrl.getButtonContent(true);
            expect(content).toEqual("Stop preview");
        });
    });

}


