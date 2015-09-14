/// <reference path="../../../app/scripts/controllers/dashboard.ts" />
/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../mock/services/get-all-public-releases.ts" />
/// <reference path="../../mock/services/get-toggles-for-release.ts" />
/// <reference path="../../mock/services/set-toggle-active.ts" />
/// <reference path="../../mock/services/get-toggles-activated-by-user.ts" />
/// <reference path="../../mock/services/toggle-auto-subscribe.ts" />
/// <reference path="../../mock/services/get-is-auto-subscribed.ts" />

'use strict';
module labsFrontendApp
{
    describe('Controller: DashboardCtrl', () => {

        // load the controller's module
        var dashboardCtrl: DashboardCtrl;
        var toggleSpy: GetTogglesForReleaseSpy;
        var rootScope: ng.IRootScopeService;
        var setToggleActiveSpy: SetToggleActiveSpy;
        var getTogglesActivatedByUserStub;
        var toggleAutoSubscribeSpy: ToggleAutoSubscribeSpy;
        var getIsAutoSubscribedStub: GetIsAutoSubscribedStub;

        var scope = {
            releases: undefined,
            feature: undefined,
            message: undefined,
            feature_sections: undefined,
            hideSuccessMessage: undefined,
            pickedFeature: undefined,
            activated: undefined,
            autoSubscribed: undefined
        };

        // Initialize the controller and a mock scope
        beforeEach( inject( ( $q: ng.IQService, $rootScope: ng.IRootScopeService ) => {
            toggleSpy =  new GetTogglesForReleaseSpy( $q );
            setToggleActiveSpy = new SetToggleActiveSpy();
            toggleAutoSubscribeSpy = new ToggleAutoSubscribeSpy();
            getTogglesActivatedByUserStub = new GetTogglesActivatedByUserStub( $q );
            getIsAutoSubscribedStub = new GetIsAutoSubscribedStub($q);
            dashboardCtrl = new DashboardCtrl( scope, new GetAllPublicReleasesStub( $q ), toggleSpy, setToggleActiveSpy,
                                               getTogglesActivatedByUserStub, toggleAutoSubscribeSpy, getIsAutoSubscribedStub );
            rootScope = $rootScope;
        } ) );

        it('should grab releases then get toggles for release ID 1', () =>
        {
            rootScope.$apply();
            expect( scope.releases ).toEqual( [GetAllPublicReleasesStub.getStubRelease()] );
            expect( toggleSpy.getReleaseId() ).toBe( 1 );
        } );

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

        it( 'should pass thru calls to setToggleActive to the service', () =>
        {
            dashboardCtrl.setToggleActive( 1, 'dogs', false );
            setToggleActiveSpy.getToggleId().should.equal( 1 );
        } );

        it( 'should update the scope when setToggleActive is called', () =>
        {
            scope.activated['dogs'] = 0;
            dashboardCtrl.setToggleActive( 1, 'dogs', true);
            scope.activated['dogs'].should.equal( 1 );
        } );

        it( 'should make toggles active if they are inactive', () =>
        {
            dashboardCtrl.setToggleActive( 1, 'dogs', true );
            setToggleActiveSpy.geLastActiveStatus().should.equal( true );
            scope.activated['dogs'].should.equal(1);
        } );

        it( 'should make toggles inactive if they are active', () =>
        {
            dashboardCtrl.setToggleActive( 1, 'dogs', false );
            setToggleActiveSpy.geLastActiveStatus().should.equal( false );
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


