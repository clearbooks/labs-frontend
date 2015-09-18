module labsFrontendApp
{
    export interface SimpleGetter
    {
        get<T>( url: string, params: Object ): ng.IPromise<T>
    }
}
