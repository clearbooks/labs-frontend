/// <reference path="../services/get-all-public-releases.ts" />

'use strict';

module labsFrontendApp
{
    export interface INextReleaseScope
    {
        nextRelease: Date;
    }

    export class NextReleaseCtrl
    {
        // @ngInject
        constructor (private $scope: INextReleaseScope, private releases: GetAllPublicReleases)
        {
            releases.execute().then( ( releases ) => {
                $scope.nextRelease = new Date( NextReleaseCtrl.getNextRelease(releases).date );
            } );
        }

        public static getNextRelease(releases: Array<Release>): Release
        {
            var today = new Date();
            for(var i = 0; i < releases.length; i++) {
                var releaseDate = new Date(releases[i].date);
                if(releaseDate.getTime() > today.getTime()) {
                    return releases[i];
                }
            }
            return releases[0];
        }
    }
}

