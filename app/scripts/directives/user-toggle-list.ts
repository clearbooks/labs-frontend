/// <reference path="../app.ts" />
/// <reference path="../controllers/dashboard.ts" />

'use strict';

module labsFrontendApp
{
    export class UserToggleList implements ng.IDirective
    {
        templateUrl = 'views/user-toggle-list.html';
        restrict = 'E';
        scope = {
            'toggleList': '=',
            'ctrl': '='
        };
    }

    export function userToggleListFactory()
    {
        return new labsFrontendApp.UserToggleList();
    }
}
