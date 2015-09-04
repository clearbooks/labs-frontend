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
/// <reference path="services/unauthorised-request-handler.ts" />
/// <reference path="config/config.ts" />


'use strict';

module labsFrontendApp
{
    declare var window: AppWindow;
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
        $provide.value('apiUrl', 'api/' );
        $provide.value('jwtUrl', window.config.jwtServer )

        } )
    .controller( 'DashboardCtrl', DashboardCtrl )
    .controller( 'JwtCallbackCtrl', JwtCallbackCtrl )
    .service( 'releases', HttpGetAllPublicReleases )
    .service( 'jwtStorage', CookieJwtTokenStorage )
    .service( 'toggles', HttpGetTogglesForRelease )
    .service( 'setActive', HttpSetToggleActive )
    .service( 'unauthorisedHandler', RedirectUnauthorisedRequestHandler )
    .directive('nextRelease', labsFrontendApp.nextReleaseFactory)
    .controller( 'PreviewFeedbackFormCtrl', PreviewFeedbackFormCtrl )
    .controller( 'SelectCtrl', SelectCtrl )
    ;
}

