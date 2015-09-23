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
            getGroupsForUser.execute().then( ( groups: Array<Group> ) => {
                $scope.groups = groups;
            } );

            jwtDecoder.getJson().then( ( json: JwtToken ) => {
                $scope.currentGroup = { id: json.groupId, name: '', url: '', isAdmin : json.isAdmin}
            } );
        }

        /**
         * Do a redirect
         * @param url
         */
        redirect( url: string )
        {
            window.location.replace( url );
        }
    }
}