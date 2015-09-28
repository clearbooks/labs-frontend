/// <reference path="../services/jwt-token-storage.ts" />
/// <reference path="group.ts" />


module labsFrontendApp
{
    export interface IJwtCallbackScope extends GroupScope
    {
        //this scope intentionally left blank
    }

    export class JwtCallbackCtrl
    {
        /**
         * @ngInject
         * @param $scope
         * @param jwtStorage
         * @param $location
         * @param jwtDecoder
         */
        constructor( $scope: IJwtCallbackScope, jwtStorage: JwtTokenStorage, $location: ng.ILocationService, jwtDecoder: DeferredJwtPayloadProvider<JwtToken> )
        {
            jwtStorage.put( $location.path().split('/').pop() );

            jwtDecoder.getJson().then( ( token: JwtToken ) => {
                console.log("jwt-callback: ");
                console.log(token);
                $scope.currentGroup.id = token.groupId;
                $scope.currentGroup.isAdmin = token.isAdmin;
                console.log("Current Group: ");
                console.log($scope.currentGroup);
            } );


            $location.path( '/dashboard' );
        }
    }
}