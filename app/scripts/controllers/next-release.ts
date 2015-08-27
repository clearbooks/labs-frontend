/// <reference path="../services/get-all-public-releases.ts" />

'use strict';

module labsFrontendApp
{
    export interface INextReleaseScope
    {
        nextRelease: string;
    }

    export class NextReleaseCtrl
    {
        // @ngInject
        constructor (private $scope: INextReleaseScope, private releases: GetAllPublicReleases)
        {
            releases.execute().then( ( releases ) => {
                $scope.nextRelease = releases.shift().date;
            } );
        }
    }
}

