/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../app/scripts/services/get-all-public-releases.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

module labsFrontendApp
{
    describe("HTTP GetAllPublicReleases stub", () =>
    {
        var service: HttpGetAllPublicReleases;
        var $httpBackend: ng.IHttpBackendService;
        var apiUrl: string;

        beforeEach( inject( ( $q: ng.IQService ) =>
        {
            apiUrl = 'http://localhost/';
            var $injector = angular.injector([ 'ngMock' ]);
            $httpBackend = $injector.get( '$httpBackend' );
            service = new HttpGetAllPublicReleases( $injector.get('$http'), $q, apiUrl )

        } ) );

        it( 'should call the API to get public releases', () =>
        {
            $httpBackend.expectGET( apiUrl + 'public-releases/list' ).respond( 200, '[]' );
            service.execute().should.eventually.deep.equal( [] );
            $httpBackend.flush();
        } );

        afterEach( () =>
        {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        } );
    } );
}