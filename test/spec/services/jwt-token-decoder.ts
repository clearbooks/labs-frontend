/// <reference path="../../../app/scripts/services/jwt-token-storage.ts" />
/// <reference path="../../../app/scripts/services/jwt-token-decoder.ts" />
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../../app/scripts/app.ts" />

module labsFrontendApp
{
    interface TestToken
    {
        userId: string;
        groupId: string;
    }

    describe( 'JWT token decoder', () =>
    {
        var storage: CookieJwtTokenStorage;
        var decoder: JwtTokenDecoder<TestToken>;
        var rootScope: ng.IRootScopeService;

        beforeEach( module( 'labsFrontendApp' ) );
        beforeEach( inject( ( $cookies: ng.cookies.ICookiesService, $q: ng.IQService, $rootScope: ng.IRootScopeService, jwtHelper: any ) =>
        {
            storage = new CookieJwtTokenStorage( $cookies );
            decoder = new JwtTokenDecoder<TestToken>( storage, $q, jwtHelper );
            rootScope = $rootScope;
        } ) );

        it( 'should reject the promise when the token is blank', ( done: () => void ) =>
        {
            storage.put( '' );
            decoder.getJson().should.be.rejected.and.notify( done );
            rootScope.$apply();
        } );

        it( 'should resolve the promise with JSON when the token is non blank', ( done: () => void ) =>
        {
            // I got this token from the JWT interactive token generator thing at jwt.io
            storage.put( 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiZ3JvdXBJZCI6IjIifQ.-KeWwam2IamY5PXqB7KrMy3ln7XTAoGDuqZroECNaRU' );
            decoder.getJson().should.eventually.deep.equal( {userId: '1', groupId: '2'} ).and.notify( done );
            rootScope.$apply();
        } );
    } );
}