/// <reference path="../services/user-groups.ts" />
'use strict';

module labsFrontendApp
{
    export interface GroupScope
    {
        groups: Array<Group>;
        currentGroup: Group;
    }

    export class GroupCtrl
    {
        /**
         * @ngInject
         * @param $scope
         * @param userGroupsService
         */
        constructor( private $scope: GroupScope, private userGroupsService: UserGroupsService )
        {
            if(!$scope.currentGroup) {
                $scope.currentGroup = {id: undefined, name: '', url: '', isAdmin: undefined};
            }

            userGroupsService.getGroupsPromise().then( ( groups: Array<Group> ) => {
                $scope.groups = groups;
                userGroupsService.getCurrentGroupPromise().then( ( currentGroup: Group ) => {
                    if ( $scope.currentGroup.id == undefined ) {
                        $scope.currentGroup.id = currentGroup.id;
                    }

                    if ( $scope.currentGroup.isAdmin == undefined ) {
                        $scope.currentGroup.isAdmin = currentGroup.isAdmin;
                    }

                    $scope.currentGroup.name = currentGroup.name;
                    $scope.currentGroup.url = currentGroup.url;
                } );
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
