/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="http/simple-getter.ts" />

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

    export class HttpGetIsAutoSubscribed implements GetIsAutoSubscribed
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
        execute():ng.IPromise<IsAutoSubscribed>
        {
            return this.simpleGetter.get( this.apiUrl + 'user/is-auto-subscribed', {} );
        }
    }
}