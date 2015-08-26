/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />

module labsFrontendApp
{
    export interface Release
    {
        name: string,
        date: string,
        releaseInfoUrl: string
    }

    export interface GetAllPublicReleases
    {
        execute(): ng.IPromise<Array<Release>>
    }

    export class HttpGetAllPublicReleases implements GetAllPublicReleases
    {
        /**
         * @param $http
         * @param $q
         * @param apiUrl
         * @ngInject
         */
        constructor( private $http: ng.IHttpService, private $q: ng.IQService, private apiUrl: string )
        {
        }

        /**
         * Execute this Use Case
         * @returns {IPromise<T>}
         */
        execute():ng.IPromise<Array<Release>>
        {
            return this.$http.get( this.apiUrl + 'public-releases/list' ).then( ( stuff: any ) => {
                return stuff.data;
            } );
        }
    }
}