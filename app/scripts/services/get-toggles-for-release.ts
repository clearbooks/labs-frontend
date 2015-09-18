/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="http/simple-getter.ts" />

module labsFrontendApp
{
    export interface Toggle
    {
        id: number,
        name: string
        summary: string
        url: string
    }

    export interface GetTogglesForRelease
    {
        execute( releaseId: number ): ng.IPromise<Array<Toggle>>
    }

    export class HttpGetTogglesForRelease implements GetTogglesForRelease
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
            return this.simpleGetter.get( this.apiUrl + 'toggle/list', {release: releaseId} );
        }
    }
}