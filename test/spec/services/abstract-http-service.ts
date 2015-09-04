/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../app/scripts/services/abstract-http-service.ts" />
/// <reference path="../../../app/scripts/services/jwt-token-storage.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

module labsFrontendApp
{
    class HttpServiceFake extends HttpService<any>
    {
        protected url = 'test';

        public runGet( params )
        {
            return this.get( params );
        }

        public runPost( params )
        {
            return this.post( params );
        }
    }

    describe("HTTP service facade", () =>
    {
        var service: HttpServiceFake;
        var $httpBackend: ng.IHttpBackendService;
        var apiUrl: string;

        var expectedHeaders = {
            "Authorization": "jwt!",
            "Accept": "application/json, text/plain, */*",
        };

        beforeEach( module( 'labsFrontendApp' ) );
        beforeEach( inject( ( $q: ng.IQService, $cookies: ng.cookies.ICookiesService ) =>
        {
            apiUrl = 'http://localhost/';
            var $injector = angular.injector([ 'ngMock' ]);
            $httpBackend = $injector.get( '$httpBackend' );
            var jwtStorage = new CookieJwtTokenStorage( $cookies );
            service = new HttpServiceFake( $injector.get('$http'), $q, apiUrl, jwtStorage );
            jwtStorage.put( 'jwt!' );
        } ) );

        it( 'should call the API when get() is called with the JWT token in Authorization', () =>
        {
            $httpBackend.expectGET( apiUrl + 'test?brollies=true', expectedHeaders ).respond( 200, '["cats"]' );
            service.runGet({brollies: true}).should.eventually.deep.equal( ["cats"] );
            $httpBackend.flush();
        } );

        it( 'should call the API when post() is called with the JWT token in Authorization', () =>
        {
            $httpBackend.expectPOST( apiUrl + 'test' ).respond( 200, '["pat"]' );
            service.runPost({}).should.eventually.deep.equal( ["pat"] );
            $httpBackend.flush();
        } );

        it( 'should encode POST parameters as www-form-data', () =>
        {
            expectedHeaders["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
            $httpBackend.expectPOST( apiUrl + 'test', $.param( {brollies: true} ), expectedHeaders ).respond( 200, '["pat"]' );
            service.runPost( {brollies: true} ).should.eventually.deep.equal( ["pat"] );
            $httpBackend.flush();
        } );

        afterEach( () =>
        {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        } );
    } );
}