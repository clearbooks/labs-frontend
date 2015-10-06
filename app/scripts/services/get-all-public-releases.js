/// <reference path="../../../typings/tsd.d.ts" />
var labsFrontendApp;
(function (labsFrontendApp) {
    var HttpGetAllPublicReleases = (function () {
        function HttpGetAllPublicReleases($http, $q, apiUrl) {
            this.$http = $http;
            this.$q = $q;
            this.apiUrl = apiUrl;
        }
        HttpGetAllPublicReleases.prototype.execute = function () {
            return this.$http.get(this.apiUrl + 'public-releases/list').then(function (stuff) {
                return stuff.data;
            });
        };
        return HttpGetAllPublicReleases;
    })();
    labsFrontendApp.HttpGetAllPublicReleases = HttpGetAllPublicReleases;
})(labsFrontendApp || (labsFrontendApp = {}));
//# sourceMappingURL=get-all-public-releases.js.map