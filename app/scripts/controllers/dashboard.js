/// <reference path="../services/get-all-public-releases.ts" />
'use strict';
var labsFrontendApp;
(function (labsFrontendApp) {
    var DashboardCtrl = (function () {
        function DashboardCtrl($scope, releases) {
            this.$scope = $scope;
            this.releases = releases;
            releases.execute().then(function (releases) {
                $scope.releases = releases;
            });
            $scope.feature = {
                chosen: undefined
            };
            $scope.message = {
                success: undefined
            };
            $scope.feature_sections = [
                { id: 1, title: "european VAT",
                    summary: "Ice cream liquorice biscuit candy canes candy biscuit caramels toffee. Wafer toffee gummies gummi bears muffin lollipop cake croissant gingerbread. Macaroon carrot cake croissant wafer sweet pie sweet roll biscuit chocolate bar. Caramels soufflé bonbon carrot cake. Halvah tiramisu wafer. " +
                        "Carrot cake powder dragée jelly beans. Sugar plum lollipop cotton candy chupa chups liquorice. Donut tootsie roll bonbon halvah icing chupa"
                },
                { id: 2, title: "Pizza",
                    summary: "Ice cream liquorice biscuit candy canes candy biscuit caramels toffee. Wafer toffee gummies gummi bears muffin lollipop cake croissant gingerbread. Macaroon carrot cake croissant wafer sweet pie sweet roll biscuit chocolate bar. Caramels soufflé bonbon carrot cake. Halvah tiramisu wafer. " +
                        "Carrot cake powder dragée jelly beans. Sugar plum lollipop cotton candy chupa chups liquorice. Donut tootsie roll bonbon halvah icing chupa"
                },
                { id: 3, title: "Pasta",
                    summary: "Ice cream liquorice biscuit candy canes candy biscuit caramels toffee. Wafer toffee gummies gummi bears muffin lollipop cake croissant gingerbread. Macaroon carrot cake croissant wafer sweet pie sweet roll biscuit chocolate bar. Caramels soufflé bonbon carrot cake. Halvah tiramisu wafer. " +
                        "Carrot cake powder dragée jelly beans. Sugar plum lollipop cotton candy chupa chups liquorice. Donut tootsie roll bonbon halvah icing chupa"
                },
                { id: 4, title: "Cheese",
                    summary: "Ice cream liquorice biscuit candy canes candy biscuit caramels toffee. Wafer toffee gummies gummi bears muffin lollipop cake croissant gingerbread. Macaroon carrot cake croissant wafer sweet pie sweet roll biscuit chocolate bar. Caramels soufflé bonbon carrot cake. Halvah tiramisu wafer. " +
                        "Carrot cake powder dragée jelly beans. Sugar plum lollipop cotton candy chupa chups liquorice. Donut tootsie roll bonbon halvah icing chupa" },
                { id: 5, title: "Chips",
                    summary: "Ice cream liquorice biscuit candy canes candy biscuit caramels toffee. Wafer toffee gummies gummi bears muffin lollipop cake croissant gingerbread. Macaroon carrot cake croissant wafer sweet pie sweet roll biscuit chocolate bar. Caramels soufflé bonbon carrot cake. Halvah tiramisu wafer. " +
                        "Carrot cake powder dragée jelly beans. Sugar plum lollipop cotton candy chupa chups liquorice. Donut tootsie roll bonbon halvah icing chupa"
                },
                { id: 6, title: "Chocolate",
                    summary: "Ice cream liquorice biscuit candy canes candy biscuit caramels toffee. Wafer toffee gummies gummi bears muffin lollipop cake croissant gingerbread. Macaroon carrot cake croissant wafer sweet pie sweet roll biscuit chocolate bar. Caramels soufflé bonbon carrot cake. Halvah tiramisu wafer. " +
                        "Carrot cake powder dragée jelly beans. Sugar plum lollipop cotton candy chupa chups liquorice. Donut tootsie roll bonbon halvah icing chupa"
                },
            ];
            $scope.hideSuccessMessage = function () {
                $scope.message.success = false;
                console.log("from close function " + $scope.message.success);
            };
            $scope.pickedFeature = function (pickedFeature) {
                $scope.feature.chosen = pickedFeature;
            };
        }
        return DashboardCtrl;
    })();
    labsFrontendApp.DashboardCtrl = DashboardCtrl;
})(labsFrontendApp || (labsFrontendApp = {}));
//# sourceMappingURL=dashboard.js.map