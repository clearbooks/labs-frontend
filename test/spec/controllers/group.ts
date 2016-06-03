/// <reference path="../../../app/scripts/controllers/group.ts" />
/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../mock/services/get-groups-for-user.ts" />
/// <reference path="../../mock/services/jwt-token-decoder.ts" />


'use strict';
module labsFrontendApp
{
    describe('Controller: GroupCtrl', () => {

        // load the controller's module
        var groupCtrl:GroupCtrl;
        var rootScope:ng.IRootScopeService;
        var groupsService: UserGroups;

        var scope:GroupScope = {
            currentGroup: undefined,
            groups: []
        };

        // Initialize the controller and a mock scope
        beforeEach(inject(($q:ng.IQService, $rootScope:ng.IRootScopeService) => {
            groupsService = new UserGroups(
                $q,
                new GetGroupsForUserStub( $q ),
                new JwtTokenDecoderStub( $q, { groupId: 1337, isAdmin: true } )
            );
            groupCtrl = new GroupCtrl( scope, groupsService );
            rootScope = $rootScope;
        }));


        it('should grab groups from the service and put them onto the scope', () => {
            rootScope.$apply();
            expect(scope.groups).toEqual([GetGroupsForUserStub.getStubGroup()]);
        });

        it('should get the current group ID from the JWT token and fabricate a currentGroup from that', () => {
            rootScope.$apply();
            var stubGroup = GetGroupsForUserStub.getStubGroup();
            var expectedCurrentGroup = {
                id: stubGroup.id,
                name: stubGroup.name,
                url: stubGroup.url,
                isAdmin: true
            };
            expect(scope.currentGroup).toEqual(expectedCurrentGroup);
        });

        it('should return the correct group when getCurrentGroupFromGroupsList is called with multiple groups', () => {
            groupsService.getCurrentGroupPromise().then( ( currentGroup: Group ) => {
                expect(currentGroup).toEqual(GetGroupsForUserStub.getStubGroup());
            } );
        });
    });

}


