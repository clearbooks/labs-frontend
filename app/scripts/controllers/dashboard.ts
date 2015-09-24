/// <reference path="../services/get-all-public-releases.ts" />
/// <reference path="../services/get-user-toggles-for-release.ts" />
/// <reference path="../services/get-is-auto-subscribed.ts" />
/// <reference path="../services/toggle-auto-subscribe.ts" />
/// <reference path="../services/get-group-toggles-for-release.ts" />
'use strict';

module labsFrontendApp {
    export interface IDashboardScope {
        activated: Object;
        releases: any;
        feature: any;
        message: any;
        feature_sections: any;
        user_features: any;
        group_features: any;
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
                     private userToggles:GetUserTogglesForRelease,
                     private groupToggles:GetGroupTogglesForRelease,
                     private userSetActive: SetToggleActive,
                     private groupSetActive: SetToggleActive,
                     private getTogglesActivatedByUser: GetTogglesActivatedByUser,
                     private toggleAutoSubscribe: ToggleAutoSubscribe,
                     private getIsAutoSubscribed: GetIsAutoSubscribed
        )
        {
            var releasePromise = releases.execute();

            $scope.feature_sections = [];

            releasePromise.then ((releases) => {
                this.getUserToggles(releases);
                this.getGroupToggles(releases);
            });


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

        private addTogglesToFeatureSections(toggles) {
            this.$scope.feature_sections.push.apply(this.$scope.feature_sections, toggles)
        }

        /**
         * @param releases
         */
        getUserToggles( releases: Array<Release> )
        {
            this.userToggles.execute( releases[0].id ).then( ( toggles: Array<Toggle> ) => {
                this.$scope.user_features = toggles;
                this.addTogglesToFeatureSections(toggles);
            } );
        }


        getGroupToggles( releases: Array<Release> )
        {
            this.groupToggles.execute( releases[0].id ).then( ( toggles: Array<Toggle> ) => {
                this.$scope.group_features = toggles;
                this.addTogglesToFeatureSections(toggles);
            } );
        }

        /**
         * @param toggleId
         * @param toggleName
         * @param active
         * @param type
         */
        setToggleActive( toggleId:number, toggleName: string, active: boolean, type: string ):void
        {
            if(typeof active === 'undefined') {
                active = true;
            }
            if(type === "simple") {
                this.userSetActive.execute(toggleId, active);
            } else if (type === "group") {
                this.groupSetActive.execute(toggleId, active);
            }
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


