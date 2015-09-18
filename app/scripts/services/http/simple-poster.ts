module labsFrontendApp
{
    export interface SimplePoster
    {
        post( url: string, params: Object ): ng.IPromise<void>
    }

}
