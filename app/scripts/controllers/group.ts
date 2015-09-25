module labsFrontendApp
{
    export interface GroupScope
    {
        groups: Array<Group>;
        currentGroup: Group;
    }

    export interface JwtToken
    {
        groupId: number;
        userId: number;
        isAdmin: boolean
    }

    export class GroupCtrl
    {
        /**
         * @ngInject
         * @param $scope
         * @param getGroupsForUser
         * @param jwtDecoder
         */
        constructor( $scope: GroupScope, getGroupsForUser: GetGroupsForUser, jwtDecoder: DeferredJwtPayloadProvider<JwtToken> )
        {
            $scope.currentGroup = {id: undefined, name: '', url: '', isAdmin: undefined};

            var groups = getGroupsForUser.execute();
            var token = jwtDecoder.getJson();

            groups.then( ( groups: Array<Group> ) => {
                $scope.groups = groups;
                console.log($scope.groups);
            } );

            groups.then( (groups: Array<Group> ) => {
                token.then( (json: JwtToken ) => {
                    var curGroup = this.getCurrentGroupFromGroupList(groups, json.groupId);
                    $scope.currentGroup.id = curGroup.id;
                    $scope.currentGroup.name = curGroup.name;
                    $scope.currentGroup.url = curGroup.url;
                    $scope.currentGroup.isAdmin = json.isAdmin;
                })
            })
        }

        /**
         * Do a redirect
         * @param url
         */
        redirect( url: string )
        {
            window.location.replace( url );
        }

        getCurrentGroupFromGroupList(groups: Array<Group>, currentGroupId: number): Group
        {
            console.log(groups[0].id);
            for(var i = 0; i < groups.length; i++) {
                console.log(groups[i]);
                if( groups[i].id == currentGroupId) {
                    console.log(currentGroupId);
                    return groups[i];
                }
            }
        }
    }
}