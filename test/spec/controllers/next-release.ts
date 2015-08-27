/// <reference path="../../../app/scripts/controllers/next-release.ts" />
/// <reference path="../../mock/services/get-all-public-releases.ts" />

'use strict';
module labsFrontendApp
{
    describe( 'Controller: NextReleaseCtrl', () => {

        // load the controller's module
        var dashboardCtrl: NextReleaseCtrl;
        var scope: INextReleaseScope;
        var root: ng.IRootScopeService;

        // Initialize the controller and a mock scope
        beforeEach( inject( ( $q: ng.IQService, $rootScope: ng.IRootScopeService ) => {
            scope = { nextRelease: "" };
            dashboardCtrl = new NextReleaseCtrl( scope, new GetAllPublicReleasesStub( $q ) );
            root = $rootScope;
        } ) );

        it( 'should put the first release date from the API onto the scope', () =>
        {
            root.$apply();
            scope.nextRelease.should.equal( '2015-01-01' );

        } );
    });

}


