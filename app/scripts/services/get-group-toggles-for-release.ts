/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="http/simple-getter.ts" />

module labsFrontendApp
{
    export interface GetGroupTogglesForRelease
    {
        execute( releaseId: number ): ng.IPromise<Array<Toggle>>
    }

    export class HttpGetGroupTogglesForRelease implements GetGroupTogglesForRelease
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
            return this.simpleGetter.get( this.apiUrl + 'toggle/group/list', {release: releaseId} );
        }
    }
}