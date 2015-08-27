/// <reference path="../services/jwt-token-storage.ts" />


module labsFrontendApp
{
    export interface IJwtCallbackScope
    {
        //this scope intentionally left blank
    }

    export class JwtCallbackCtrl
    {
        constructor( $scope: IJwtCallbackScope, jwtStorage: JwtTokenStorage, $location: ng.ILocationService )
        {
            jwtStorage.put( $location.hash().split('/').pop() );
        }
    }
}