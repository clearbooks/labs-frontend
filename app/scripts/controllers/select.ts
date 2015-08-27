/// <reference path="dashboard.ts" />

'use strict';

module labsFrontendApp {

    export interface IPreviewScope extends IDashboardScope
    {
        releases: any;
    }

    export class SelectCtrl {
        // @ngInject
        constructor (private $scope: IDashboardScope) {

        }
    }
}









