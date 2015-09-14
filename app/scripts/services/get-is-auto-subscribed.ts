/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="abstract-http-service.ts" />

module labsFrontendApp
{
    export interface IsAutoSubscribed
    {
        autoSubscribed: boolean
    }

    export interface GetIsAutoSubscribed
    {
        execute(): ng.IPromise<Object>
    }

    export class HttpGetIsAutoSubscribed extends HttpService<IsAutoSubscribed> implements GetIsAutoSubscribed
    {
        /**
         * The URL to use
         * @type {string}
         */
        protected url = 'user/is-auto-subscribed';

        /**
         * Execute this Use Case
         * @returns {IPromise<T>}
         */
        execute():ng.IPromise<IsAutoSubscribed>
        {
            return this.get( {} );
        }
    }
}