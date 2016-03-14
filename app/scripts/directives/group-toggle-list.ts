/// <reference path="../app.ts" />
/// <reference path="../controllers/dashboard.ts" />

'use strict';

module labsFrontendApp
{
    export class GroupToggleList implements ng.IDirective
    {
        templateUrl = 'views/group-toggle-list.html';
        restrict = 'E';
        scope = {
            'toggleList': '=',
            'ctrl': '='
        };
    }

    export function groupToggleListFactory()
    {
        return new labsFrontendApp.GroupToggleList();
    }
}
