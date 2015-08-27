/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../../app/scripts/services/get-all-public-releases.ts" />
var labsFrontendApp;
(function (labsFrontendApp) {
    var GetAllPublicReleasesStub = (function () {
        function GetAllPublicReleasesStub($q) {
            this.$q = $q;
        }
        GetAllPublicReleasesStub.prototype.execute = function () {
            var promise = this.$q.defer();
            promise.resolve([]);
            return promise.promise;
        };
        return GetAllPublicReleasesStub;
    })();
    labsFrontendApp.GetAllPublicReleasesStub = GetAllPublicReleasesStub;
})(labsFrontendApp || (labsFrontendApp = {}));
//# sourceMappingURL=get-all-public-releases.js.map