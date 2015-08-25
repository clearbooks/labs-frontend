/// <reference path="../../typings/tsd.d.ts" />

'use strict';

angular.module('labsFrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ]).config(
    ($stateProvider:angular.ui.IStateProvider, $urlRouterProvider:angular.ui.IUrlRouterProvider) => {
        $urlRouterProvider.otherwise("/dashboard");
        $stateProvider.state( 'dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard.html"
        });
    })
    .config( ( $provide: any ) => {
        $provide.value('apiUrl', '{{LABS_API_URL}}' )
    } ) ;
