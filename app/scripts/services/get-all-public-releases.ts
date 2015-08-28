/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="abstract-http-service.ts" />

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

    export class HttpGetAllPublicReleases extends HttpService<Array<Release>> implements GetAllPublicReleases
    {
        /**
         * The URL to use
         * @type {string}
         */
        protected url = 'public-releases/list';

        /**
         * Execute this Use Case
         * @returns {IPromise<T>}
         */
        execute():ng.IPromise<Array<Release>>
        {
            return this.get( {} );
        }
    }
}