/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../app/scripts/controllers/dashboard.ts" />

'use strict';

describe('Controller: DashboardCtrl', () => {

  // load the controller's module
  beforeEach(module('labsFrontendApp'));

  var DashboardCtrl: labsFrontendApp.DashboardCtrl,
    scope: labsFrontendApp.IDashboardScope;

  // Initialize the controller and a mock scope
  beforeEach(inject(($controller: ng.IControllerService, $rootScope: ng.IRootScopeService) => {
    scope = <any>$rootScope.$new();
    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope
    });
  }));

  it('should do nothing', () =>  {

  })
});
