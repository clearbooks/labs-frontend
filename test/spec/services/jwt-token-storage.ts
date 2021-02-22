/// <reference path="../../../app/scripts/services/jwt-token-storage.ts" />
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../../app/scripts/app.ts" />
/// <reference path="../../mock/in-memory-cookies-service.ts"/>

module labsFrontendApp
{
    describe( 'CookieJwtTokenStorage', () =>
    {
        var storage: CookieJwtTokenStorage;
        var cookie: InMemoryCookiesService;

        beforeEach( module( 'labsFrontendApp' ) );
        beforeEach( inject( () =>
        {
            cookie = new InMemoryCookiesService();
            storage = new CookieJwtTokenStorage(cookie);
            cookie.put( 'jwt', undefined );
        } ) );

        it( 'should store the token in a cookie', () =>
        {
            storage.put( 'cats' );
            cookie.get('jwt').should.equal( 'cats' );
            cookie.getOptions('jwt').secure.should.equal(true);
        } );

        it( 'should get the token from the cookie', () =>
        {
            cookie.put( 'jwt', '12345' );
            storage.get().should.equal( '12345' );
        } );
    } );
}
