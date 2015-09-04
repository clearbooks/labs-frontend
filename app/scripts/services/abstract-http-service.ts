/// <reference path="unauthorised-request-handler.ts" />


module labsFrontendApp
{
    export class HttpService<T>
    {
        /**
         * The URL to use
         * @type {string}
         */
        protected url: string;

        /**
         * @param $http
         * @param $q
         * @param apiUrl
         * @ngInject
         * @param jwtStorage
         * @param unauthorisedHandler
         */
        constructor( private $http: ng.IHttpService,
                     private $q: ng.IQService,
                     private apiUrl: string,
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
            return {
                Authorization: this.jwtStorage.get()
            }
        }

        /**
         *
         * @param params
         * @returns {IPromise<TResult>}
         */
        protected get( params: Object ): ng.IPromise<T>
        {
            return this.$http.get( this.apiUrl + this.url, { params: params, headers: this.getHeaders() } ).then( ( stuff: any ) => {
                return stuff.data;
            }, () => {
                this.unauthorisedHandler.handleUnauthorisedRequest();
            } );
        }

        /**
         * @param params
         * @returns {IPromise<TResult>}
         */
        protected post( params: Object ): ng.IPromise<T>
        {
            var headers = this.getHeaders();
            headers["Content-Type"] =  "application/x-www-form-urlencoded;charset=utf-8";

            var req = {
                method: 'POST',
                url: this.apiUrl + this.url,
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