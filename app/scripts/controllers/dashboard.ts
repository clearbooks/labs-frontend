/// <reference path="../app.ts" />

'use strict';

module labsFrontendApp {
  export interface IDashboardScope extends ng.IScope {

  }

  export class DashboardCtrl {
    // @ngInject
    constructor (private $scope: IDashboardScope) {

    }
  }
}

angular.module('labsFrontendApp')
  .controller('DashboardCtrl', labsFrontendApp.DashboardCtrl);
