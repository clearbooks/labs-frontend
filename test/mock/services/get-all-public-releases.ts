/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../../app/scripts/services/get-all-public-releases.ts" />

module labsFrontendApp
{
    export class GetAllPublicReleasesStub implements GetAllPublicReleases
    {
        /**
         * Array<Release>
         */
        private releases;

        constructor( private $q: ng.IQService )
        {
            this.releases = GetAllPublicReleasesStub.getDefaultStubReleases();
        }

        /**
         * Execute this Use Case
         * @returns {IPromise<T>}
         */
        execute():ng.IPromise<Array<Release>>
        {
            var promise = this.$q.defer();
            promise.resolve( this.releases );
            return promise.promise;
        }

        /**
         * @param releases
         */
        setReleases( releases: Array<Release> )
        {
            this.releases = releases;
        }

        static getDefaultStubReleases(): Array<Release>
        {
            var pastReleaseDate = new Date();
            pastReleaseDate.setDate(pastReleaseDate.getDate() - 10);
            var futureReleaseDate = new Date();
            futureReleaseDate.setDate(futureReleaseDate.getDate() + 10);
            return [{
                id: 1,
                name: 'Cat Release',
                date: pastReleaseDate.toDateString(),
                releaseInfoUrl: ''
            },{
                id: 2,
                name: 'Dog Release',
                date: futureReleaseDate.toDateString(),
                releaseInfoUrl: ''
            }];
        }
    }
}
