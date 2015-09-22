/// <reference path="../unauthorised-request-handler.ts" />
/// <reference path="simple-getter.ts" />
/// <reference path="simple-poster.ts" />


module labsFrontendApp
{
    export class SimpleHttp implements SimpleGetter, SimplePoster
    {
        /**
         * @ngInject
         * @param $http
         * @param jwtStorage
         * @param unauthorisedHandler
         */
        constructor( protected $http: ng.IHttpService,
                     private jwtStorage: JwtTokenStorage,
                     private unauthorisedHandler: UnauthorisedRequestHandler )
        {
            $http.defaults.headers.common.Authorization = jwtStorage.get();
        }

        /**
         * Get the headers to use for each request
         * @returns {{Authorization: string}}
         */
        private getHeaders()
        {
            console.log( 'hi', this.jwtStorage.get() );
            return {
                Authorization: this.jwtStorage.get()
            }
        }

        /**
         * @param url
         * @param params
         * @returns {IPromise<TResult>}
         */
        get<T>( url: string, params: Object ): ng.IPromise<T>
        {
            return this.$http.get( url, { params: params, headers: this.getHeaders() } ).then( ( stuff: any ) => {
                return stuff.data;
            }, () => {
                this.unauthorisedHandler.handleUnauthorisedRequest();
            } );
        }

        /**
         * @param url
         * @param params
         * @returns {IPromise<TResult>}
         */
        post( url: string, params: Object ): ng.IPromise<void>
        {
            var headers = this.getHeaders();
            headers["Content-Type"] =  "application/x-www-form-urlencoded;charset=utf-8";

            var req = {
                method: 'POST',
                url: url,
                headers: headers,
                data: $.param( params )
            };

            return this.$http( req ).then( ( stuff: any ) => {
                return stuff.data;
            }, () => {
                this.unauthorisedHandler.handleUnauthorisedRequest();
            } );
        }
    }

}