/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../../app/scripts/services/get-all-public-releases.ts" />

module labsFrontendApp
{
    export class GetAllPublicReleasesStub implements GetAllPublicReleases
    {
        constructor( private $q: ng.IQService )
        {
        }

        /**
         * Execute this Use Case
         * @returns {IPromise<T>}
         */
        execute():ng.IPromise<Array<Release>>
        {
            var promise = this.$q.defer();
            promise.resolve( [{
                name: 'Cat Release',
                date: '2015-01-01',
                releaseInfoUrl: ''
            }] );
            return promise.promise;
        }
    }
}