/// <reference path="../../../app/scripts/services/jwt-token-storage.ts" />
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../../app/scripts/app.ts" />


module labsFrontendApp
{
    describe( 'CookieJwtTokenStorage', () =>
    {
        var storage: CookieJwtTokenStorage;
        var cookie: ng.cookies.ICookiesService;

        beforeEach( module( 'labsFrontendApp' ) );
        beforeEach( inject( ( $cookies: ng.cookies.ICookiesService ) =>
        {
            storage = new CookieJwtTokenStorage( $cookies );
            $cookies.put( 'jwt', undefined );
            cookie = $cookies;
        } ) );

        it( 'should store the token in a cookie', () =>
        {
            storage.put( 'cats' );
            cookie.get('jwt').should.equal( 'cats' );
        } );

        it( 'should get the token from the cookie', () =>
        {
            cookie.put( 'jwt', '12345' );
            storage.get().should.equal( '12345' );
        } );
    } );
}