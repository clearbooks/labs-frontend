/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="http/simple-getter.ts" />

module labsFrontendApp
{
    export interface Toggle
    {
        id: number
        name: string
        summary: string
        url: string
        screenshot: string
        type: string
    }

    export interface GetUserTogglesForRelease
    {
        execute( releaseId: number ): ng.IPromise<Array<Toggle>>
    }

    export class HttpGetUserTogglesForRelease implements GetUserTogglesForRelease
    {
        /**
         * @ngInject
         * @param apiUrl
         * @param simpleGetter
         */
        constructor( private apiUrl: string, private simpleGetter: SimpleGetter ) {}

        /**
         * @param releaseId
         */
        execute( releaseId:number ):ng.IPromise<Array<Toggle>>
        {
            return this.simpleGetter.get( this.apiUrl + 'toggle/user/list', {release: releaseId} );
        }
    }
}