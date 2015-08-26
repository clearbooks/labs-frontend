/// <reference path="../../../app/scripts/controllers/dashboard.ts" />
/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../mock/services/get-all-public-releases.ts" />

'use strict';
module labsFrontendApp
{
    describe('Controller: DashboardCtrl', () => {

        // load the controller's module
        var dashboardCtrl: DashboardCtrl;

        // Initialize the controller and a mock scope
        beforeEach( inject( ( $q: ng.IQService ) => {
            dashboardCtrl = new DashboardCtrl( {releases: []}, new GetAllPublicReleasesStub( $q ) );
        } ) );

        it('should do nothing', () =>
        {
            //well indeed
        } );
    });

}


