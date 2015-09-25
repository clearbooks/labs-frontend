/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="controllers/dashboard.ts" />
/// <reference path="controllers/group.ts" />
/// <reference path="services/get-all-public-releases.ts" />
/// <reference path="services/get-user-toggles-for-release.ts" />
/// <reference path="services/get-is-auto-subscribed.ts" />
/// <reference path="services/set-user-toggle-active.ts" />
/// <reference path="services/toggle-auto-subscribe.ts" />
/// <reference path="controllers/form.ts" />
/// <reference path="controllers/select.ts" />
/// <reference path="services/jwt-token-storage.ts" />
/// <reference path="services/jwt-token-decoder.ts" />
/// <reference path="directives/next-release.ts" />
/// <reference path="controllers/jwt-callback.ts" />
/// <reference path="services/unauthorised-request-handler.ts" />
/// <reference path="services/get-toggles-activated-by-user.ts" />
/// <reference path="services/http/simple-http.ts" />
/// <reference path="services/get-groups-for-user.ts" />
/// <reference path="config/config.ts" />
/// <reference path="services/submit-toggle-feedback.ts" />
/// <reference path="services/set-group-toggle-active.ts" />


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
        'ui.router',
        'angular-jwt'
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
        $provide.value('jwtUrl', window.config.jwtServer );
        $provide.value('accountApiHost', window.config.accountApiHost );
        $provide.value('accountApiEndpoint', window.config.accountApiEndpoint );
    } )
    .controller( 'DashboardCtrl', DashboardCtrl )
    .controller( 'GroupCtrl', GroupCtrl )
    .controller( 'JwtCallbackCtrl', JwtCallbackCtrl )
    .service( 'releases', HttpGetAllPublicReleases )
    .service( 'getTogglesActivatedByUser', HttpGetTogglesActivatedByUser )
    .service( 'jwtStorage', CookieJwtTokenStorage )
    .service( 'jwtDecoder', JwtTokenDecoder )
    .service( 'userToggles', HttpGetUserTogglesForRelease )
    .service( 'groupToggles', HttpGetGroupTogglesForRelease )
    .service( 'userSetActive', HttpSetUserToggleActive )
    .service( 'groupSetActive', HttpSetGroupToggleActive )
    .service( 'unauthorisedHandler', RedirectUnauthorisedRequestHandler )
    .service( 'toggleAutoSubscribe', HttpAutoSubscribe)
    .service( 'getIsAutoSubscribed', HttpGetIsAutoSubscribed)
    .service( 'simpleGetter', SimpleHttp )
    .service( 'simplePoster', SimpleHttp )
    .service( 'getGroupsForUser', HttpGetGroupsForUser )
    .service( 'submitFeedback', HttpSubmitToggleFeedback)
    .directive('nextRelease', labsFrontendApp.nextReleaseFactory)
    .controller( 'PreviewFeedbackFormCtrl', PreviewFeedbackFormCtrl )
    .controller( 'SelectCtrl', SelectCtrl )
    ;
}

