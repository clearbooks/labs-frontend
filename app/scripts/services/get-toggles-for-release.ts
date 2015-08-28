/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="abstract-http-service.ts" />

module labsFrontendApp
{
    export interface Toggle
    {
        id: number,
        name: string
        summary: string
    }

    export interface GetTogglesForRelease
    {
        execute( releaseId: number ): ng.IPromise<Array<Toggle>>
    }

    export class HttpGetTogglesForRelease extends HttpService<Array<Toggle>> implements GetTogglesForRelease
    {
        protected url = 'toggle/list';

        /**
         * @param releaseId
         */
        execute( releaseId:number ):ng.IPromise<Array<Toggle>>
        {
            return this.get( {release: releaseId} );
        }
    }
}