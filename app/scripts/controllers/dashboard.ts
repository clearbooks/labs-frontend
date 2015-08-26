/// <reference path="../services/getallpublicreleases.ts" />

'use strict';

module labsFrontendApp
{
  export interface IDashboardScope
  {
    releases: any;
  }

  export class DashboardCtrl
  {
    // @ngInject
    constructor (private $scope: IDashboardScope, private releases: GetAllPublicReleases) {
      releases.execute().then( ( releases ) => {
        $scope.releases = releases;
      } );
    }
  }
}

