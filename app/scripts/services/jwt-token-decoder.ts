module labsFrontendApp
{
    export interface DeferredJwtPayloadProvider<T>
    {
        getJson(): ng.IPromise<T>
    }

    export class JwtTokenDecoder<T> implements DeferredJwtPayloadProvider<T>
    {
        /**
         * @ngInject
         * @param jwtStorage
         * @param $q
         * @param jwtHelper
         */
        constructor( private jwtStorage: JwtTokenStorage, private $q: ng.IQService, private jwtHelper: any ) {}

        public getJson(): ng.IPromise<T>
        {
            var deferred = this.$q.defer();
            var token = this.jwtStorage.get();

            if ( !token ) {
                deferred.reject();
            } else {
                var json = this.jwtHelper.decodeToken( token );
                deferred.resolve( json );
            }

            return deferred.promise;
        }
    }
}