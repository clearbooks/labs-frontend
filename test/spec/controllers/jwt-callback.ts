/// <reference path="../../../app/scripts/controllers/jwt-callback.ts" />
/// <reference path="../../../app/scripts/services/jwt-token-storage.ts" />

'use strict';
module labsFrontendApp
{
    describe( 'Controller: JwtCallbackCtrl', () =>
    {
        beforeEach( module( 'labsFrontendApp' ) );
        var jwtTokenStorage: JwtTokenStorage;
        var location: ng.ILocationService;
        var scope: IJwtCallbackScope;

        // Initialize the controller and a mock scope
        beforeEach( inject( ( $cookies: ng.cookies.ICookiesService, $location: ng.ILocationService ) =>
        {
            scope = {};
            location = $location;
            jwtTokenStorage = new CookieJwtTokenStorage( $cookies );
        } ) );

        it( 'should put the last part of the URL fragment into the JWT token storage then go to the dashboard', () =>
        {
            location.hash( '/jwt/123456.123234.123123' );
            new JwtCallbackCtrl( scope, jwtTokenStorage, location );
            jwtTokenStorage.get().should.equal( '123456.123234.123123' );
            location.path().should.equal( '/dashboard' );
        } );
    });

}


