/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../app/scripts/services/unauthorised-request-handler.ts" />
/// <reference path="../../../app/scripts/services/jwt-token-storage.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

module labsFrontendApp
{
    class UnauthorisedRequestHandlerSpy implements UnauthorisedRequestHandler
    {
        public wasCalled = false;

        handleUnauthorisedRequest():void
        {
            this.wasCalled = true;
        }

    }

    describe( "Simple HTTP Facade", () =>
    {
        var service: SimpleHttp;
        var $httpBackend: ng.IHttpBackendService;
        var unauthorisedSpy: UnauthorisedRequestHandlerSpy;
        var apiUrl: string;

        beforeEach( module( 'labsFrontendApp' ) );
        beforeEach( inject( ( $cookies: ng.cookies.ICookiesService ) =>
        {
            apiUrl = 'http://localhost/';
            var $injector = angular.injector([ 'ngMock' ]);
            $httpBackend = $injector.get( '$httpBackend' );
            var jwtStorage = new CookieJwtTokenStorage( $cookies );
            unauthorisedSpy = new UnauthorisedRequestHandlerSpy();
            service = new SimpleHttp( $injector.get('$http'), jwtStorage, unauthorisedSpy );
            jwtStorage.put( 'jwt!' );
        } ) );

        it( 'should call the API when get() is called with the JWT token in Authorization', () =>
        {
            var expectedHeaders = {
              "Authorization": "jwt!",
              "Accept": "application/json, text/plain, */*",
            };
            $httpBackend.expectGET( apiUrl + '?brollies=true', expectedHeaders ).respond( 200, '["cats"]' );
            service.get( apiUrl, {brollies: true}).should.eventually.deep.equal( ["cats"] );
            $httpBackend.flush();
        } );

        it( 'should call the API when post() is called with the JWT token in Authorization', () =>
        {
            $httpBackend.expectPOST( apiUrl ).respond( 200, '["pat"]' );
            service.post( apiUrl, {}).should.eventually.deep.equal( ["pat"] );
            $httpBackend.flush();
        } );

        it( 'should encode POST parameters as www-form-data', () =>
        {
            var expectedHeaders = {
              "Authorization": "jwt!",
              "Accept": "application/json, text/plain, */*",
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            };
            $httpBackend.expectPOST( apiUrl, $.param( {brollies: true} ), expectedHeaders ).respond( 200, '["pat"]' );
            service.post( apiUrl, {brollies: true} ).should.eventually.deep.equal( ["pat"] );
            $httpBackend.flush();
        } );

        it( 'should call the UnauthorisedRequestHandler when an API call fails for any reason', () =>
        {
            $httpBackend.expectPOST( apiUrl ).respond( 401 );
            service.post( apiUrl, {brollies: true} );
            $httpBackend.flush();
            expect( unauthorisedSpy.wasCalled ).toBe( true );

        } );

        afterEach( () =>
        {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        } );
    } );
}
