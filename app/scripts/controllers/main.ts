/// <reference path="../app.ts" />

'use strict';

module labsFrontendApp {
  export interface IMainScope extends ng.IScope {
    awesomeThings: any[];
  }

  export class MainCtrl {
    // @ngInject
    constructor (private $scope: IMainScope) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    }
  }
}

angular.module('labsFrontendApp')
  .controller('MainCtrl', labsFrontendApp.MainCtrl);
