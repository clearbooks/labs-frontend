/// <reference path="../../mock/services/simple-http.ts" />
/// <reference path="../../../app/scripts/services/get-groups-for-user.ts" />


module labsFrontendApp
{
    var mockHost = 'http://example.com';
    var mockEndpoint = '/blah/blah';
    var service: GetGroupsForUser;
    var getter: SimpleGetterSpy;


    describe('Get groups for user service', () =>
    {
        beforeEach( inject( ( $q: ng.IQService ) =>
        {
            getter = new SimpleGetterSpy( $q );
            service = new HttpGetGroupsForUser( mockHost, mockEndpoint, getter );
        } ) );

        it( 'should call the right URLs with no params', () =>
        {
            service.execute();
            expect( getter.url ).toBe( mockHost + mockEndpoint );
            expect( getter.params ).toEqual( {} );
        } );
    } );
}