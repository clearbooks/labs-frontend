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
         */
        constructor( private $http: ng.IHttpService, private $q: ng.IQService, private apiUrl: string )
        {
        }

        /**
         *
         * @param params
         * @returns {IPromise<TResult>}
         */
        protected get( params: Object ): ng.IPromise<T>
        {
            return this.$http.get( this.apiUrl + this.url, { params: params } ).then( ( stuff: any ) => {
                return stuff.data;
            } );
        }

        /**
         * @param params
         * @returns {IPromise<TResult>}
         */
        protected post( params: Object ): ng.IPromise<T>
        {
            return this.$http.post( this.apiUrl + this.url, $.param( params ) ).then( ( stuff: any ) => {
                return stuff.data;
            } );
        }
    }

}