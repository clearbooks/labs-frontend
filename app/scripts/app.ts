/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="controllers/dashboard.ts" />
/// <reference path="services/get-all-public-releases.ts" />
/// <reference path="services/get-toggles-for-release.ts" />
/// <reference path="services/set-toggle-active.ts" />
/// <reference path="controllers/form.ts" />
/// <reference path="controllers/select.ts" />

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
                url: "/jwt/:token",
                templateUrl: "views/jwt.html",
            });
    })
    .config( ( $provide: any ) => {
        $provide.value('apiUrl', 'api/' )
    } )
    .controller( 'DashboardCtrl', DashboardCtrl )
    .controller( 'JwtCallbackCtrl', JwtCallbackCtrl )
    .service( 'releases', HttpGetAllPublicReleases )
    .service( 'jwtStorage', CookieJwtTokenStorage )
    .service( 'toggles', HttpGetTogglesForRelease )
    .service( 'setActive', HttpSetToggleActive )
    .directive('nextRelease', labsFrontendApp.nextReleaseFactory)
    .controller( 'PreviewFeedbackFormCtrl', PreviewFeedbackFormCtrl )
    .controller( 'SelectCtrl', SelectCtrl )
    ;
}

