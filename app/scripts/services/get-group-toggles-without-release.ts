/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="http/simple-getter.ts" />

module labsFrontendApp
{
    export interface GetGroupTogglesWithoutRelease
    {
        execute(): ng.IPromise<Array<Toggle>>
    }

    export class HttpGetGroupTogglesWithoutRelease implements GetGroupTogglesWithoutRelease
    {
        /**
         * @ngInject
         * @param apiUrl
         * @param simpleGetter
         */
        constructor( private apiUrl: string, private simpleGetter: SimpleGetter ) {}

        execute():ng.IPromise<Array<Toggle>>
        {
            return this.simpleGetter.get( this.apiUrl + 'toggle/group/list-without-release', { } );
        }
    }
}
