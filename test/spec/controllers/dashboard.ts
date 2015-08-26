/// <reference path="../../../app/scripts/controllers/dashboard.ts" />
/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />

'use strict';
module labsFrontendApp
{
    describe('Controller: DashboardCtrl', () => {

        // load the controller's module
        var dashboardCtrl: labsFrontendApp.DashboardCtrl;

        // Initialize the controller and a mock scope
        beforeEach( () => {
            dashboardCtrl = new DashboardCtrl( { releases: [] }, { execute: () => { return undefined }} );
        });

        it('should do nothing', () =>  {
            //well indeed
        } );
    });

}


