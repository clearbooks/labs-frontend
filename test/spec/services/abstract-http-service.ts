/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../app/scripts/services/abstract-http-service.ts" />
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

        beforeEach( inject( ( $q: ng.IQService ) =>
        {
            apiUrl = 'http://localhost/';
            var $injector = angular.injector([ 'ngMock' ]);
            $httpBackend = $injector.get( '$httpBackend' );
            service = new HttpServiceFake( $injector.get('$http'), $q, apiUrl )

        } ) );

        it( 'should call the API when get() is called', () =>
        {
            $httpBackend.expectGET( apiUrl + 'test?brollies=true' ).respond( 200, '["cats"]' );
            service.runGet({brollies: true}).should.eventually.deep.equal( ["cats"] );
            $httpBackend.flush();
        } );

        it( 'should call the API when post() is called', () =>
        {
            $httpBackend.expectPOST( apiUrl + 'test' ).respond( 200, '["pat"]' );
            service.runPost({}).should.eventually.deep.equal( ["pat"] );
            $httpBackend.flush();
        } );

        it( 'should encode POST parameters as www-form-data', () =>
        {
            $httpBackend.expectPOST( apiUrl + 'test', $.param( {brollies: true} ) ).respond( 200, '["pat"]' );
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