/// <reference path="../app.ts" />
/// <reference path="../controllers/next-release.ts" />

'use strict';

module labsFrontendApp
{
  export class NextRelease implements ng.IDirective
  {
    template = '<span>{{nextRelease}}</span>';
    controller = ['$scope', 'releases', NextReleaseCtrl];
    restrict = 'E';
  }

  export function nextReleaseFactory()
  {
    return new labsFrontendApp.NextRelease();
  }
}