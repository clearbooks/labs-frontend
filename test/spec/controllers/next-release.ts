/// <reference path="../../../app/scripts/controllers/next-release.ts" />
/// <reference path="../../mock/services/get-all-public-releases.ts" />

'use strict';
module labsFrontendApp
{
    describe( 'Controller: NextReleaseCtrl', () => {

        // load the controller's module
        var dashboardCtrl: NextReleaseCtrl;
        var scope: INextReleaseScope;

        // Initialize the controller and a mock scope
        beforeEach( inject( ( $q: ng.IQService ) => {
            scope = { nextRelease: "" };
            dashboardCtrl = new NextReleaseCtrl( scope, new GetAllPublicReleasesStub( $q ) );
        } ) );

        it( 'should put the first release date from the API onto the scope', () =>
        {
            expect( scope.nextRelease ).toEqual( '2015-01-01' );
        } );
    });

}


