/// <reference path="../../../app/scripts/services/set-toggle-active.ts" />

module labsFrontendApp
{
    export class GetTogglesForReleaseSpy implements GetTogglesForRelease
    {
        private releaseId: number;

        constructor( private $q: ng.IQService )
        {
        }

        execute( releaseId:number ):angular.IPromise<Array<labsFrontendApp.Toggle>>
        {
            this.releaseId = releaseId;
            var promise = this.$q.defer();
            promise.resolve( [] );
            return promise.promise;
        }

        getReleaseId()
        {
            return this.releaseId;
        }
    }
}