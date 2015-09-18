/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="http/simple-getter.ts" />

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
         * @ngInject
         * @param apiUrl
         * @param simpleGetter
         */
        constructor( private apiUrl: string, private simpleGetter: SimpleGetter ) {}

        /**
         * Execute this Use Case
         * @returns {IPromise<T>}
         */
        execute():ng.IPromise<Array<Release>>
        {
            return this.simpleGetter.get<Array<Release>>( this.apiUrl + 'public-releases/list', {} );
        }
    }
}