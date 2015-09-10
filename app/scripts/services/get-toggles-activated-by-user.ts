/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="abstract-http-service.ts" />

module labsFrontendApp
{
    export interface ActivatedToggle
    {
        key: string,
    }

    export interface GetTogglesActivatedByUser
    {
        execute(): ng.IPromise<Object>
    }

    export class HttpGetTogglesActivatedByUser extends HttpService<Array<ActivatedToggle>> implements GetAllPublicReleases
    {
        /**
         * The URL to use
         * @type {string}
         */
        protected url = 'toggle/user/is-activated';

        /**
         * Execute this Use Case
         * @returns {IPromise<T>}
         */
        execute():ng.IPromise<Object>
        {
            return this.get( {} );
        }
    }
}