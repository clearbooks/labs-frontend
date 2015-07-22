/// <reference path="../app.ts" />

'use strict';

module labsFrontendApp {
  export interface IAboutScope extends ng.IScope {
    awesomeThings: any[];
  }

  export class AboutCtrl {
    // @ngInject
    constructor (private $scope: IAboutScope) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    }
  }
}

angular.module('labsFrontendApp')
  .controller('AboutCtrl', labsFrontendApp.AboutCtrl);
