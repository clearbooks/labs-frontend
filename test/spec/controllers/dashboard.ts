/// <reference path="../../../app/scripts/controllers/dashboard.ts" />
/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../mock/services/get-all-public-releases.ts" />
/// <reference path="../../mock/services/get-toggles-for-release.ts" />
/// <reference path="../../mock/services/set-toggle-active.ts" />
/// <reference path="../../mock/services/get-all-toggle-status.ts" />
/// <reference path="../../mock/services/get-groups-for-user.ts" />
/// <reference path="../../mock/services/toggle-auto-subscribe.ts" />
/// <reference path="../../mock/services/get-is-auto-subscribed.ts" />
/// <reference path="../../mock/services/get-toggles-without-release.ts" />

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
        var getAllToggleStatusStub: GetAllToggleStatusStub;
        var toggleAutoSubscribeSpy: ToggleAutoSubscribeSpy;
        var getIsAutoSubscribedStub: GetIsAutoSubscribedStub;
        var getUserTogglesWithoutRelease: GetTogglesWithoutReleaseStub;
        var getGroupTogglesWithoutRelease: GetTogglesWithoutReleaseStub;

        var scope = {
            releases: undefined,
            feature: undefined,
            message: undefined,
            featureSections: undefined,
            user_features: undefined,
            group_features: undefined,
            hideSuccessMessage: undefined,
            pickedFeature: undefined,
            toggleStatuses: undefined,
            autoSubscribed: undefined,
            groups: undefined,
            selectedFeatureType: undefined,
            userTogglesWithoutRelease: undefined,
            groupTogglesWithoutRelease: undefined
        };

        var groupScope = {
            groups: undefined,
            currentGroup: undefined
        };

        // Initialize the controller and a mock scope
        beforeEach( inject( ( $q: ng.IQService, $rootScope: ng.IRootScopeService ) => {
            userToggleSpy =  new GetTogglesForReleaseSpy( $q );
            groupToggleSpy = new GetTogglesForReleaseSpy( $q );
            userSetToggleActiveSpy = new SetToggleActiveSpy();
            groupSetToggleActiveSpy = new SetToggleActiveSpy();
            toggleAutoSubscribeSpy = new ToggleAutoSubscribeSpy();
            getAllToggleStatusStub = new GetAllToggleStatusStub( $q );
            getIsAutoSubscribedStub = new GetIsAutoSubscribedStub($q);
            getUserTogglesWithoutRelease = new GetTogglesWithoutReleaseStub( $q );
            getGroupTogglesWithoutRelease = new GetTogglesWithoutReleaseStub( $q );
            var groupsService = new UserGroups(
                $q,
                new GetGroupsForUserStub( $q ),
                new JwtTokenDecoderStub( $q, { groupId: 1337, isAdmin: true } )
            );
            dashboardCtrl = new DashboardCtrl(
                scope, new GetAllPublicReleasesStub( $q ), userToggleSpy, groupToggleSpy,
                userSetToggleActiveSpy, groupSetToggleActiveSpy,
                getAllToggleStatusStub, toggleAutoSubscribeSpy, getIsAutoSubscribedStub,
                getUserTogglesWithoutRelease, getGroupTogglesWithoutRelease, groupsService
            );
            rootScope = $rootScope;
        } ) );

        it('should grab releases then get toggles for release ID 41', () =>
        {
            rootScope.$apply();
            expect( scope.releases ).toEqual( GetAllPublicReleasesStub.getDefaultStubReleases() );
            expect( userToggleSpy.getReleaseId() ).toEqual( GetAllPublicReleasesStub.getDefaultStubReleases()[1].id );
            expect( groupToggleSpy.getReleaseId() ).toEqual( GetAllPublicReleasesStub.getDefaultStubReleases()[1].id );
        } );

        it('should add features correctly to feature_sections', () => {
            rootScope.$apply();
            var expectedArray = [];
            expectedArray.push.apply(expectedArray, getUserTogglesWithoutRelease.getToggles());
            expectedArray.push.apply(expectedArray, getGroupTogglesWithoutRelease.getToggles());
            expectedArray.push.apply(expectedArray, userToggleSpy.getToggles());
            expectedArray.push.apply(expectedArray, groupToggleSpy.getToggles());
            expect(scope.featureSections).toEqual(expectedArray);
        });

        it('should grab user toggles without release', () =>
        {
            rootScope.$apply();
            expect( scope.userTogglesWithoutRelease ).toEqual( dashboardCtrl.separateToggles( getUserTogglesWithoutRelease.getToggles() ) );
        } );

        it('should grab group toggles without release', () =>
        {
            rootScope.$apply();
            expect( scope.groupTogglesWithoutRelease ).toEqual( dashboardCtrl.separateToggles( getGroupTogglesWithoutRelease.getToggles() ) );
        } );

        it('should set selectedFeatureType to 1 as there are user toggles given', () => {
            rootScope.$apply();
            expect(scope.selectedFeatureType).toEqual(1);
        });

        it('should get if the user is auto subscribed and set it on the scope', () =>
        {
            rootScope.$apply();
            expect(scope.autoSubscribed).toEqual(getIsAutoSubscribedStub.getStubData().autoSubscribed);
        } );

        it( 'should put toggles status data onto the scope', () =>
        {
            rootScope.$apply();
            expect( scope.toggleStatuses ).toEqual( getAllToggleStatusStub.getStubData() )
        } );

        it( 'should pass thru calls to userSetToggleActive to the service when called with type "simple"', () =>
        {
            rootScope.$apply();
            dashboardCtrl.setToggleActive( 1, false, "simple" );
            expect(userSetToggleActiveSpy.getToggleId()).toEqual( 1 );
            expect(groupSetToggleActiveSpy.getToggleId()).toBeUndefined();
        } );

        it( 'should pass thru calls to groupSetToggleActive ot the service when called with type "group"', () =>
        {
            rootScope.$apply();
            dashboardCtrl.setToggleActive(1, false, "group" );
            expect(groupSetToggleActiveSpy.getToggleId()).toEqual( 1 );
            expect(userSetToggleActiveSpy.getToggleId()).toBeUndefined();
        });

        it( 'should update the scope when setToggleActive is called', () =>
        {
            rootScope.$apply();
            scope.toggleStatuses['1'].active = 0;
            dashboardCtrl.setToggleActive( 1, true, "simple");
            scope.toggleStatuses['1'].active.should.equal( 1 );
        } );

        it( 'should make toggles active if they are inactive', () =>
        {
            rootScope.$apply();
            dashboardCtrl.setToggleActive( 1, true, "simple" );
            userSetToggleActiveSpy.geLastActiveStatus().should.equal( true );
            scope.toggleStatuses['1'].active.should.equal(1);
        } );

        it( 'should make toggles inactive if they are active', () =>
        {
            rootScope.$apply();
            dashboardCtrl.setToggleActive( 2, false, "simple" );
            userSetToggleActiveSpy.geLastActiveStatus().should.equal( false );
            scope.toggleStatuses['2'].active.should.equal(0);
        } );

        it( 'isToggleActive should return true if toggle is active', () =>
        {
            rootScope.$apply();
            dashboardCtrl.isToggleActive( 2 ).should.equal(true);
        } );

        it( 'isToggleActive should return false if toggle is not active', () =>
        {
            rootScope.$apply();
            dashboardCtrl.isToggleActive( 1 ).should.equal(false);
        } );

        it( 'isToggleLocked should return true if toggle is locked', () =>
        {
            rootScope.$apply();
            dashboardCtrl.isToggleLocked( 3 ).should.equal(true);
        } );

        it( 'isToggleLocked should return false if toggle is not locked', () =>
        {
            rootScope.$apply();
            dashboardCtrl.isToggleLocked( 2 ).should.equal(false);
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
            var content = dashboardCtrl.getButtonContent(true);
            expect(content).toEqual("Stop preview");
        });

        it ('should return an object containing two empty arrays called withScreenshot and withoutScreenshot when called with an empty array', () =>
        {
            var toggles = [];
            var separatedToggles = dashboardCtrl.separateToggles(toggles);
            expect(separatedToggles).toEqual({withScreenshot: [], withoutScreenshot: []});
        });

        it ('should return an object containing an array of one toggle with a screenshot, and an empty array of toggles without a screenshot when called with one toggle with a screenshot', () =>
        {
            var crimsonToggle = {
                id: 1, name: 'toggle',
                summary: 'toggle',
                url: 'http://crimsonDucks',
                screenshot: 'picture',
                type: 'duck'
            };
            var toggles = [
                crimsonToggle
            ];

            var separatedToggles = dashboardCtrl.separateToggles(toggles);
            expect(separatedToggles).toEqual({withScreenshot: toggles, withoutScreenshot:[]});
        });

        it ('should return an object containing an empty array of toggles with a screenshot and an array of one toggle without a screenshot when called with only one toggle with no screenshot', () =>
        {

            var crimsonToggle = {
                id: 1, name: 'toggle',
                summary: 'toggle',
                url: 'http://crimsonDucks',
                screenshot: undefined,
                type: 'duck'
            };

            var toggles = [
                crimsonToggle
            ];

            var separatedToggles = dashboardCtrl.separateToggles(toggles);
            expect(separatedToggles).toEqual({withScreenshot: [], withoutScreenshot:toggles});
        });

        it ('should return an object containing an array of one toggle with screenshot, and an array of one toggle without screenshot when called with an array containing a toggle with a screenshot, and a toggle without a screenshot', () => {
            var crimsonScreenshot = {
                id: 1, name: 'toggle',
                summary: 'toggle',
                url: 'http://crimsonDucks',
                screenshot: 'picture',
                type: 'duck'
            };

            var scarletNoScreenshot = {
                id: 1, name: 'toggle',
                summary: 'toggle',
                url: 'http://scarletMallards',
                screenshot: undefined,
                type: 'duck'
            };

            var toggles = [crimsonScreenshot, scarletNoScreenshot];

            var separatedToggles = dashboardCtrl.separateToggles(toggles);
            expect(separatedToggles).toEqual({withScreenshot:[crimsonScreenshot], withoutScreenshot: [scarletNoScreenshot]});
        });

        it('should return true when calling hasToggles with features in the list', () => {
            var toggle = {
                id: 1, name: 'toggle',
                summary: 'toggle',
                url: 'http://crimsonDucks',
                screenshot: 'picture',
                type: 'duck'
            };

            expect(dashboardCtrl.hasToggles({withScreenshot:[toggle], withoutScreenshot:[]})).toBeTruthy();
        });

        it('should return false when calling hasToggles with no features', () => {
            expect(dashboardCtrl.hasToggles({withScreenshot:[], withoutScreenshot:[]})).toBeFalsy();
        });

        it('should return false when calling hasToggles with undefined', () => {
            expect(dashboardCtrl.hasToggles(undefined)).toBeFalsy();
        });

        it('should return false when calling hasToggles with null', () => {
            expect(dashboardCtrl.hasToggles(null)).toBeFalsy();
        });
    });
}
