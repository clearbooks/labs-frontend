/// <reference path="../../mock/services/simple-http.ts" />
/// <reference path="../../../app/scripts/services/cached-public-releases.ts" />

module labsFrontendApp
{
    describe('Cached public releases service', () =>
    {
        var getAllPublicReleasesStub: GetAllPublicReleasesStub;
        var cachedPublicReleases: CachedPublicReleases;

        beforeEach( inject( ( $q: ng.IQService ) =>
        {
            getAllPublicReleasesStub = new GetAllPublicReleasesStub( $q );
            cachedPublicReleases = new CachedPublicReleases( getAllPublicReleasesStub, $q );
        } ) );

        it( 'should return empty array if there are no releases', () =>
        {
            getAllPublicReleasesStub.setReleases( [ ] );
            cachedPublicReleases.execute().then( (releases) => {
                expect( releases ).toEqual( [ ] );
            } );
        } );

        it( 'should return the releases if there are releases', () =>
        {
            cachedPublicReleases.execute().then( (releases) => {
                expect( releases ).toEqual( GetAllPublicReleasesStub.getDefaultStubReleases() );
            } );
        } );

        it( 'should still return the releases retrieved after the first execution when executed more than once', () =>
        {
            cachedPublicReleases.execute();
            getAllPublicReleasesStub.setReleases( [ ] );
            cachedPublicReleases.execute().then( (releases) => {
                expect( releases ).toEqual( GetAllPublicReleasesStub.getDefaultStubReleases() );
            } );
        } );
    } );
}
