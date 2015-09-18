/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="http/simple-getter.ts" />

module labsFrontendApp
{
    export interface Group
    {
        id: number;
        name: string;
        url: string;
    }

    export interface GetGroupsForUser
    {
        execute(): ng.IPromise<Array<Group>>
    }

    export class HttpGetGroupsForUser implements GetGroupsForUser
    {
        /**
         * @ngInject
         * @param accountApiHost
         * @param accountApiEndpoint
         * @param simpleGetter
         */
        constructor( private accountApiHost: string, private accountApiEndpoint: string, private simpleGetter: SimpleGetter ) {}

        /**
         * Execute this Use Case
         * @returns {IPromise<T>}
         */
        execute():ng.IPromise<Array<Group>>
        {
            return this.simpleGetter.get( this.accountApiHost + this.accountApiEndpoint, {} );
        }
    }
}