/// <reference path="../../../app/scripts/services/set-user-toggle-active.ts" />
/// <reference path="../../../app/scripts/services/get-group-toggles-for-release.ts" />

module labsFrontendApp
{
    export class GetTogglesForReleaseSpy implements GetUserTogglesForRelease, GetGroupTogglesForRelease
    {
        private releaseId: number;

        private toggles: Array<labsFrontendApp.Toggle>;

        constructor( private $q: ng.IQService )
        {
            this.toggles = [
                {
                    id: 1,
                    name: "Crimson Duck Mode",
                    summary: "The best mode you ever did see.",
                    url: "super.mode.awesome",
                    type: "The best, around."
                }
            ]
        }

        execute( releaseId:number ):angular.IPromise<Array<labsFrontendApp.Toggle>>
        {
            this.releaseId = releaseId;
            var promise = this.$q.defer();
            promise.resolve( this.toggles );
            return promise.promise;
        }

        getReleaseId()
        {
            return this.releaseId;
        }

        getToggles()
        {
            return this.toggles
        }
    }
}