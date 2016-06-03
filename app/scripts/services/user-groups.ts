/// <reference path="../../../typings/tsd.d.ts" />

module labsFrontendApp
{
    export interface JwtToken
    {
        groupId: number;
        userId: number;
        isAdmin: boolean
    }

    export interface UserGroupsService
    {
        getCurrentGroupPromise();
        getGroupsPromise();
    }
    
    export class UserGroups implements UserGroupsService
    {
        private groupsPromise: ng.IPromise<Array<Group>>;
        private currentGroupPromise: ng.IPromise<Group>;

        /**
         * @ngInject
         * @param $q
         * @param getGroupsForUser
         * @param jwtDecoder
         */
        constructor( $q: ng.IQService, getGroupsForUser: GetGroupsForUser, jwtDecoder: DeferredJwtPayloadProvider<JwtToken> ) {
            this.groupsPromise = getGroupsForUser.execute();
            var currentGroupDefer = $q.defer();
            this.currentGroupPromise = currentGroupDefer.promise;
            var token = jwtDecoder.getJson();

            this.groupsPromise.then( ( groups: Array<Group> ) => {
                token.then( ( json: JwtToken ) => {
                    for ( var i = 0; i < groups.length; ++i ) {
                        if ( groups[i].id == json.groupId ) {
                            var currentGroup = groups[i];
                            currentGroup.isAdmin = json.isAdmin;
                            currentGroupDefer.resolve( currentGroup );
                            break;
                        }
                    }
                })
            })
        }

        /**
         * @returns {ng.IPromise<Group>}
         */
        getCurrentGroupPromise()
        {
            return this.currentGroupPromise;
        }

        /**
         * @returns {ng.IPromise<Array<Group>>}
         */
        getGroupsPromise()
        {
            return this.groupsPromise;
        }
    }
}
