/// <reference path="../services/get-all-public-releases.ts" />
/// <reference path="../services/get-toggles-for-release.ts" />

'use strict';

module labsFrontendApp {
    export interface IDashboardScope {
        activated: Object;
        releases: any;
        feature: any;
        message: any;
        feature_sections: any;
        hideSuccessMessage: any;
        pickedFeature: any;

    }

    export class DashboardCtrl
    {
        // @ngInject
        constructor( private $scope:IDashboardScope,
                     private releases:GetAllPublicReleases,
                     private toggles:GetTogglesForRelease,
                     private setActive: SetToggleActive,
                     private getTogglesActivatedByUser: GetTogglesActivatedByUser )
        {
            var releasePromise = releases.execute();
            this.getToggles( releasePromise );

            releasePromise.then((releases) => {
                $scope.releases = releases;
            });

            getTogglesActivatedByUser.execute().then( ( activated ) => {
                $scope.activated = activated;
            } );

            $scope.feature = {
                chosen: undefined
            };

            $scope.message = {
                success: undefined
            };

            $scope.hideSuccessMessage = ()  => {
                $scope.message.success = false;//hide message if user wants to write/submit more feedback
                console.log("from close function " + $scope.message.success);
            };

            $scope.pickedFeature = (pickedFeature) => {
                $scope.feature.chosen = pickedFeature;
            };
        }

        /**
         * @param releases
         */
        getToggles( releases: ng.IPromise<Array<Release>> )
        {
            releases.then( ( r: Array<Release> ) => {
                this.toggles.execute( 1 ).then( ( toggles: Array<Toggle> ) => {
                    this.$scope.feature_sections = toggles;
                } );
            } );
        }

        /**
         * @param toggleId
         */
        setToggleActive( toggleId:number ):void
        {
            this.setActive.execute( toggleId );
        }
    }
}


