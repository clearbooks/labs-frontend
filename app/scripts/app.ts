/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="controllers/dashboard.ts" />
/// <reference path="services/getallpublicreleases.ts" />
'use strict';

module labsFrontendApp
{
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
        $provide.value('apiUrl', '{{LABS_API_URL}}/' )
    } )
    .controller( 'DashboardCtrl', DashboardCtrl )
    .service( 'releases', HttpGetAllPublicReleases )

    ;
}

