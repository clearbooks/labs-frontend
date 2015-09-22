/// <reference path="../../../app/scripts/controllers/group.ts" />
/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../mock/services/get-groups-for-user.ts" />
/// <reference path="../../mock/services/jwt-token-decoder.ts" />


'use strict';
module labsFrontendApp
{
    describe('Controller: GroupCtrl', () => {

        // load the controller's module
        var dashboardCtrl: GroupCtrl;
        var rootScope: ng.IRootScopeService;

        var scope: GroupScope = {
            currentGroup: undefined,
            groups: []
        };

        // Initialize the controller and a mock scope
        beforeEach( inject( ( $q: ng.IQService, $rootScope: ng.IRootScopeService ) => {
            dashboardCtrl = new GroupCtrl( scope, new GetGroupsForUserStub( $q ), new JwtTokenDecoderStub( $q, {groupId: 123} ) );
            rootScope = $rootScope;
        } ) );


        it('should grab groups from the service and put them onto the scope', () =>
        {
            rootScope.$apply();
            expect( scope.groups ).toEqual( [GetGroupsForUserStub.getStubGroup()] );
        } );

        it( 'should get the current group ID from the JWT token and fabricate a currentGroup from that', () =>
        {
            rootScope.$apply();
            expect( scope.currentGroup.id ).toBe( 123 );
        } );
    });

}


