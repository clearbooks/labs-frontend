/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="http/simple-getter.ts" />

module labsFrontendApp
{
    export interface GetAllToggleStatus
    {
        execute(): ng.IPromise<Object>
    }

    export class HttpGetAllToggleStatus implements GetAllToggleStatus
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
        execute():ng.IPromise<Object>
        {
            return this.simpleGetter.get( this.apiUrl + 'toggle/user/all-toggle-status', {} );
        }
    }
}
