/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="http/simple-getter.ts" />

module labsFrontendApp
{
    export interface GetUserTogglesWithoutRelease
    {
        execute(): ng.IPromise<Array<Toggle>>
    }

    export class HttpGetUserTogglesWithoutRelease implements GetUserTogglesWithoutRelease
    {
        /**
         * @ngInject
         * @param apiUrl
         * @param simpleGetter
         */
        constructor( private apiUrl: string, private simpleGetter: SimpleGetter ) {}

        execute():ng.IPromise<Array<Toggle>>
        {
            return this.simpleGetter.get( this.apiUrl + 'toggle/user/list-without-release', { } );
        }
    }
}
