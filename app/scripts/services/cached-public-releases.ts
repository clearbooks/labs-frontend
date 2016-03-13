/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="get-all-public-releases.ts" />

module labsFrontendApp
{
    export class CachedPublicReleases implements GetAllPublicReleases
    {
        /**
         * @type Array<Release>
         */
        private cachedReleases = null;

        /**
         * IDeferred<Array<Release>>
         */
        private deferred;

        /**
         * @ngInject
         * @param releases
         * @param $q
         */
        constructor( private releases: GetAllPublicReleases, private $q: ng.IQService ) {
            this.deferred = $q.defer();

            if ( this.cachedReleases !== null ) {
                this.deferred.resolve( this.cachedReleases );
                return;
            }

            releases.execute().then((releases) => {
                this.cachedReleases = releases;
                this.deferred.resolve( this.cachedReleases );
            });
        }

        /**
         * Execute this Use Case
         * @returns {IPromise<T>}
         */
        execute():ng.IPromise<Array<Release>>
        {
            return this.deferred.promise;
        }
    }
}
