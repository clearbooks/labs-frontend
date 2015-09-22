/// <reference path="../services/get-all-public-releases.ts" />
/// <reference path="../services/get-toggles-for-release.ts" />
/// <reference path="../services/get-is-auto-subscribed.ts" />
/// <reference path="../services/toggle-auto-subscribe.ts" />
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
        autoSubscribed: boolean;
        groups: any;
    }

    export class DashboardCtrl
    {
        // @ngInject
        constructor( private $scope:IDashboardScope,
                     private releases:GetAllPublicReleases,
                     private toggles:GetTogglesForRelease,
                     private setActive: SetToggleActive,
                     private getTogglesActivatedByUser: GetTogglesActivatedByUser,
                     private toggleAutoSubscribe: ToggleAutoSubscribe,
                     private getIsAutoSubscribed: GetIsAutoSubscribed
        )
        {
            var releasePromise = releases.execute();
            this.getToggles( releasePromise );
            $scope.activated = {};

            releasePromise.then((releases) => {
                $scope.releases = releases;
            });

            getTogglesActivatedByUser.execute().then( ( activated ) => {
                $scope.activated = activated;
            } );

            getIsAutoSubscribed.execute().then((autoSubscribed: IsAutoSubscribed) => {
                $scope.autoSubscribed = autoSubscribed.autoSubscribed;
            });

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
         * @param toggleName
         * @param active
         */
        setToggleActive( toggleId:number, toggleName: string, active: boolean ):void
        {
            if(typeof active === 'undefined') {
                active = true;
            }
            this.setActive.execute( toggleId, active );
            if(active) {
                this.$scope.activated[toggleName] = 1;
            } else {
                delete this.$scope.activated[toggleName];
            }
        }

        autoSubscribe():void
        {
            this.toggleAutoSubscribe.execute();
            this.$scope.autoSubscribed = !this.$scope.autoSubscribed;
        }

        getButtonContent(activated: boolean):string
        {
            if(activated) {
                return "Stop preview";
            } else {
                return "Preview"
            }
        }
    }
}


