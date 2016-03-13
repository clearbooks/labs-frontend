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
        beforeEach( inject( ( $q: ng.IQService, $rootScope: ng.IRootScopeService ) =>
        {
            scope = { nextRelease: undefined };
            dashboardCtrl = new NextReleaseCtrl( scope, new GetAllPublicReleasesStub( $q ) );
            root = $rootScope;
        } ) );

        it( 'should get the future release when given an array of releases with one in the future and one in the past', () =>
        {
            var releases: Array<Release> = GetAllPublicReleasesStub.getDefaultStubReleases();
            expect(NextReleaseCtrl.getNextRelease(releases)).toEqual(releases[1]);
        });

        it( 'should put the next release date from the API onto the scope', () =>
        {
            root.$apply();
            var expectedDate = new Date(GetAllPublicReleasesStub.getDefaultStubReleases()[1].date);
            expect( scope.nextRelease ).toEqual( expectedDate );
        } );

        it( 'should should return null if an empty release array is passed', () =>
        {
            expect(NextReleaseCtrl.getNextRelease([])).toEqual(null);
        });

        it( 'should should return null if a release array is passed with releases only in the past', () =>
        {
            var releases = [{
                id: 1,
                name: 'Cat Release',
                date: '2010-01-01',
                releaseInfoUrl: ''
            },{
                id: 2,
                name: 'Dog Release',
                date: ( new Date() ).toDateString(),
                releaseInfoUrl: ''
            }];

            expect(NextReleaseCtrl.getNextRelease(releases)).toEqual(null);
        });
    });
}
