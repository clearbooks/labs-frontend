/// <reference path="../../../app/scripts/controllers/jwt-callback.ts" />
/// <reference path="../../../app/scripts/services/jwt-token-storage.ts" />

'use strict';
module labsFrontendApp
{
    describe( 'Controller: JwtCallbackCtrl', () =>
    {
        beforeEach( module( 'labsFrontendApp' ) );
        var decoder: DeferredJwtPayloadProvider<JwtToken>;
        var jwtTokenStorage: JwtTokenStorage;
        var location: ng.ILocationService;
        var rootScope: ng.IRootScopeService;
        var scope: IJwtCallbackScope;

        // Initialize the controller and a mock scope
        beforeEach( inject( ( $cookies: ng.cookies.ICookiesService, $location: ng.ILocationService, $q: ng.IQService, $rootScope: ng.IRootScopeService ) =>
        {
            location = $location;
            scope = { currentGroup: {id: undefined, name: "", url: ""}, groups: [] };
            jwtTokenStorage = new CookieJwtTokenStorage( $cookies );
            decoder = new JwtTokenDecoderStub<JwtToken>( $q, {groupId: 123, userId: 12345} );
            rootScope = $rootScope;
        } ) );

        it( 'should put the last part of the URL fragment into the JWT token storage then go to the dashboard', () =>
        {
            location.path( '/jwt/123456.123234.123123' );
            new JwtCallbackCtrl( scope, jwtTokenStorage, location, decoder );
            jwtTokenStorage.get().should.equal( '123456.123234.123123' );
            location.path().should.equal( '/dashboard' );
        } );

        it( 'should set the current group to the decoded group ID from the token', () =>
        {
            location.path( '/jwt/123456.123234.123123' );
            new JwtCallbackCtrl( scope, jwtTokenStorage, location, decoder );
            rootScope.$apply();

            expect( scope.currentGroup.id ).toEqual( 123 );
        } );
    });

}


