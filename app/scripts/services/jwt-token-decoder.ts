module labsFrontendApp
{
    export class JwtTokenDecoder<T>
    {
        /**
         * @ngInect
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