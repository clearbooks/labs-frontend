/// <reference path="../../../app/scripts/services/get-user-toggles-without-release.ts" />
/// <reference path="../../../app/scripts/services/get-group-toggles-without-release.ts" />

module labsFrontendApp
{
    export class GetTogglesWithoutReleaseStub implements GetUserTogglesWithoutRelease, GetGroupTogglesWithoutRelease
    {
        private toggles: Array<labsFrontendApp.Toggle> = [ ];

        constructor( private $q: ng.IQService )
        {
            this.toggles = [
                {
                    id: 1,
                    name: "Crimson Duck Mode",
                    summary: "The best mode you ever did see.",
                    url: "super.mode.awesome",
                    screenshot: "screenshot",
                    type: "simple"
                }
            ];
        }

        execute():angular.IPromise<Array<labsFrontendApp.Toggle>>
        {
            var promise = this.$q.defer();
            promise.resolve( this.toggles );
            return promise.promise;
        }

        getToggles(): Array<labsFrontendApp.Toggle>
        {
            return this.toggles;
        }
    }
}
