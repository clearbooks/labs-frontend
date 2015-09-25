/// <reference path="../../../app/scripts/controllers/group.ts" />
/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../mock/services/get-groups-for-user.ts" />
/// <reference path="../../mock/services/jwt-token-decoder.ts" />


'use strict';
module labsFrontendApp
{
    describe('Controller: GroupCtrl', () => {

        // load the controller's module
        var dashboardCtrl:GroupCtrl;
        var rootScope:ng.IRootScopeService;

        var scope:GroupScope = {
            currentGroup: undefined,
            groups: []
        };

        // Initialize the controller and a mock scope
        beforeEach(inject(($q:ng.IQService, $rootScope:ng.IRootScopeService) => {
            dashboardCtrl = new GroupCtrl(scope, new GetGroupsForUserStub($q), new JwtTokenDecoderStub($q, {
                groupId: 1337,
                isAdmin: true
            }));
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
            var expectedGroup = {
                id: 2,
                name: "Crimson Cats",
                url: "cats.awesome",
                isAdmin: true
            };
            var groups: Array<Group> = [
                {
                    id: 1,
                    name: "Crimmy D",
                    url: "crimson.ducks.awesome",
                    isAdmin: true
                }, expectedGroup
            ];

            var curGroupId = 2;

            var curGroup = dashboardCtrl.getCurrentGroupFromGroupList(groups, curGroupId);

            expect(curGroup).toEqual(expectedGroup);
        });
    });

}


