/// <reference path="../../../app/scripts/services/jwt-token-decoder.ts" />

module labsFrontendApp
{
    export class JwtTokenDecoderStub<T> implements DeferredJwtPayloadProvider<T>
    {
        constructor( private $q: ng.IQService, private payload: T ) {}

        getJson():angular.IPromise<T>
        {
            var deferred = this.$q.defer();
            deferred.resolve( this.payload );
            return deferred.promise;
        }

    }
}