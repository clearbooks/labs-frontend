/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="controllers/dashboard.ts" />
/// <reference path="services/get-all-public-releases.ts" />
/// <reference path="services/jwt-token-storage.ts" />
/// <reference path="directives/next-release.ts" />
/// <reference path="controllers/jwt-callback.ts" />

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
            $stateProvider.state( 'jwt', {
                url: "/jwt",
                templateUrl: "views/jwt.html"
            });
    })
    .config( ( $provide: any ) => {
        $provide.value('apiUrl', '{{LABS_API_URL}}/' )
    } )
    .controller( 'DashboardCtrl', DashboardCtrl )
    .controller( 'JwtCallbackCtrl', JwtCallbackCtrl )
    .service( 'releases', HttpGetAllPublicReleases )
    .service( 'jwtStorage', CookieJwtTokenStorage )
    .directive('nextRelease', labsFrontendApp.nextReleaseFactory)


    ;
}

