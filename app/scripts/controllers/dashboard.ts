/// <reference path="../services/get-all-public-releases.ts" />
/// <reference path="../services/get-user-toggles-for-release.ts" />
/// <reference path="../services/get-is-auto-subscribed.ts" />
/// <reference path="../services/toggle-auto-subscribe.ts" />
/// <reference path="../services/get-group-toggles-for-release.ts" />
'use strict';

module labsFrontendApp {
    export interface IDashboardScope {
        toggleStatuses: Object;
        releases: any;
        feature: any;
        message: any;
        user_features: any;
        group_features: any;
        hideSuccessMessage: any;
        pickedFeature: any;
        autoSubscribed: boolean;
        groups: any;
        selectedFeatureType: number;
        userTogglesWithoutRelease: any;
        groupTogglesWithoutRelease: any;
    }

    export interface SeparatedToggles {
        withScreenshot: Array<Toggle>;
        withoutScreenshot: Array<Toggle>;
    }

    export class DashboardCtrl
    {
        public FEATURE_TYPE_SIMPLE: number = 1;
        public FEATURE_TYPE_GROUP: number = 2;

        // @ngInject
        constructor( private $scope:IDashboardScope,
                     private cachedReleases:GetAllPublicReleases,
                     private userToggles:GetUserTogglesForRelease,
                     private groupToggles:GetGroupTogglesForRelease,
                     private userSetActive: SetToggleActive,
                     private groupSetActive: SetToggleActive,
                     private getAllToggleStatus: GetAllToggleStatus,
                     private toggleAutoSubscribe: ToggleAutoSubscribe,
                     private getIsAutoSubscribed: GetIsAutoSubscribed,
                     private getUserTogglesWithoutRelease: GetUserTogglesWithoutRelease,
                     private getGroupTogglesWithoutRelease: GetGroupTogglesWithoutRelease
        )
        {
            $scope.userTogglesWithoutRelease = null;
            $scope.groupTogglesWithoutRelease = null;
            $scope.user_features = null;
            $scope.group_features = null;

            cachedReleases.execute().then((releases) => {
                $scope.releases = releases;
                var nextRelease = NextReleaseCtrl.getNextRelease(releases);
                if ( nextRelease !== null ) {
                    this.getUserToggles(nextRelease.id);
                    this.getGroupToggles(nextRelease.id);
                }
            });

            $scope.toggleStatuses = {};

            getAllToggleStatus.execute().then( ( toggleStatuses ) => {
                $scope.toggleStatuses = toggleStatuses;
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
            };

            $scope.pickedFeature = (pickedFeature) => {
                $scope.feature.chosen = pickedFeature;
            };

            getUserTogglesWithoutRelease.execute().then( ( userTogglesWithoutRelease: Array<Toggle> ) => {
                $scope.userTogglesWithoutRelease = this.separateToggles( userTogglesWithoutRelease );

                if ( userTogglesWithoutRelease.length > 0 ) {
                    this.switchToFeatureTypeIfUndefined( this.FEATURE_TYPE_SIMPLE );
                }
            } );

            getGroupTogglesWithoutRelease.execute().then( ( groupTogglesWithoutRelease: Array<Toggle> ) => {
                $scope.groupTogglesWithoutRelease = this.separateToggles( groupTogglesWithoutRelease );

                if ( groupTogglesWithoutRelease.length > 0 ) {
                    this.switchToFeatureTypeIfUndefined( this.FEATURE_TYPE_GROUP );
                }
            } );
        }

        /**
         * @param featureType
         */
        private switchToFeatureTypeIfUndefined( featureType: number ):void
        {
            if ( typeof this.$scope.selectedFeatureType !== 'undefined'
                && !( featureType == this.FEATURE_TYPE_SIMPLE && this.$scope.selectedFeatureType == this.FEATURE_TYPE_GROUP ) ) {
                return;
            }

            this.$scope.selectedFeatureType = featureType;
        }

        /**
         * @returns {boolean}
         */
        private hasFeaturesLoaded():boolean
        {
            return this.$scope.userTogglesWithoutRelease != null && this.$scope.groupTogglesWithoutRelease != null
                && this.$scope.user_features != null && this.$scope.group_features != null;
        }

        /**
         * @param releaseId
         */
        getUserToggles( releaseId: number ):void
        {
            this.userToggles.execute( releaseId ).then( ( toggles: Array<Toggle> ) => {
                this.$scope.user_features = this.separateToggles(toggles);
                if ( toggles.length > 0 ) {
                    this.switchToFeatureTypeIfUndefined( this.FEATURE_TYPE_SIMPLE );
                }
            } );
        }

        /**
         * @param releaseId
         */
        getGroupToggles( releaseId: number ):void
        {
            this.groupToggles.execute( releaseId ).then( ( toggles: Array<Toggle> ) => {
                this.$scope.group_features = this.separateToggles(toggles);
                if ( toggles.length > 0 ) {
                    this.switchToFeatureTypeIfUndefined( this.FEATURE_TYPE_GROUP );
                }
            } );
        }

        /**
         * @param toggleId
         * @param active
         * @param type
         */
        setToggleActive( toggleId:number, active: boolean, type: string ):void
        {
            if(typeof active === 'undefined') {
                active = true;
            }

            if ( typeof this.$scope.toggleStatuses[toggleId] == 'undefined' || this.isToggleLocked( toggleId ) ) {
                return;
            }

            if(type === "simple") {
                this.userSetActive.execute(toggleId, active);
            } else if (type === "group") {
                this.groupSetActive.execute(toggleId, active);
            }
            if(active) {
                this.$scope.toggleStatuses[toggleId].active = 1;
            } else {
                this.$scope.toggleStatuses[toggleId].active = 0;
            }
        }

        /**
         * @param toggleId
         * @returns {boolean}
         */
        isToggleActive( toggleId:number ):boolean
        {
            return typeof this.$scope.toggleStatuses[toggleId] != 'undefined'
                   && this.$scope.toggleStatuses[toggleId].active == 1;
        }

        /**
         * @param toggleId
         * @returns {boolean}
         */
        isToggleLocked( toggleId:number ):boolean
        {
            return typeof this.$scope.toggleStatuses[toggleId] != 'undefined'
                   && this.$scope.toggleStatuses[toggleId].locked == 1;
        }

        autoSubscribe():void
        {
            this.toggleAutoSubscribe.execute();
            this.$scope.autoSubscribed = !this.$scope.autoSubscribed;
        }

        /**
         * @param activated
         * @returns {any}
         */
        getButtonContent(activated: boolean):string
        {
            if(activated) {
                return "Stop preview";
            } else {
                return "Preview"
            }
        }

        /**
         * @returns {boolean}
         */
        isNothingToSee(): boolean
        {
            return this.hasFeaturesLoaded() && !this.hasAnyToggles();
        }

        separateToggles(toggles: Array<Toggle>): SeparatedToggles
        {
            var separatedToggles = {withScreenshot: [], withoutScreenshot: []};
            toggles.forEach((toggle: Toggle) => {
                if(toggle.screenshot) {
                    separatedToggles.withScreenshot.push(toggle);
                } else {
                    separatedToggles.withoutScreenshot.push(toggle);
                }
            });
            return separatedToggles;
        }

        /**
         * @param toggles
         * @returns {boolean}
         */
        hasToggles(toggles: SeparatedToggles):boolean
        {
            return !(typeof toggles === 'undefined') && toggles != null && (toggles.withoutScreenshot.length > 0 || toggles.withScreenshot.length > 0);
        }

        /**
         * @returns {boolean}
         */
        hasAnyToggles():boolean
        {
            return this.hasAnyUserToggles() || this.hasAnyGroupToggles();
        }

        /**
         * @returns {boolean}
         */
        hasAnyUserToggles():boolean
        {
            return this.hasToggles(this.$scope.user_features) || this.hasToggles(this.$scope.userTogglesWithoutRelease);
        }

        /**
         * @returns {boolean}
         */
        hasAnyGroupToggles():boolean
        {
            return this.hasToggles(this.$scope.group_features) || this.hasToggles(this.$scope.groupTogglesWithoutRelease);
        }
    }
}
