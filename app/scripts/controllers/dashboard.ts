/// <reference path="../app.ts" />

'use strict';

module labsFrontendApp {
  export interface IDashboardScope extends ng.IScope {

  }

  export class DashboardCtrl {
    // @ngInject
    constructor (private $scope: IDashboardScope) {

    }
  }
}

angular.module('labsFrontendApp')

    .controller('DashboardCtrl', function($scope){

      $scope.feature = {
        chosen: undefined
      };

      $scope.divs = [

        {id: 1, title:"european VAT",
          summary: "Ice cream liquorice biscuit candy canes candy biscuit caramels toffee. Wafer toffee gummies gummi bears muffin lollipop cake croissant gingerbread. Macaroon carrot cake croissant wafer sweet pie sweet roll biscuit chocolate bar. Caramels soufflé bonbon carrot cake. Halvah tiramisu wafer. " +
        "Carrot cake powder dragée jelly beans. Sugar plum lollipop cotton candy chupa chups liquorice. Donut tootsie roll bonbon halvah icing chupa"
        },
        {id: 2, title:"Pizza",
          summary: "Ice cream liquorice biscuit candy canes candy biscuit caramels toffee. Wafer toffee gummies gummi bears muffin lollipop cake croissant gingerbread. Macaroon carrot cake croissant wafer sweet pie sweet roll biscuit chocolate bar. Caramels soufflé bonbon carrot cake. Halvah tiramisu wafer. " +
          "Carrot cake powder dragée jelly beans. Sugar plum lollipop cotton candy chupa chups liquorice. Donut tootsie roll bonbon halvah icing chupa"
        },
        {id: 3, title:"Pasta",
          summary: "Ice cream liquorice biscuit candy canes candy biscuit caramels toffee. Wafer toffee gummies gummi bears muffin lollipop cake croissant gingerbread. Macaroon carrot cake croissant wafer sweet pie sweet roll biscuit chocolate bar. Caramels soufflé bonbon carrot cake. Halvah tiramisu wafer. " +
          "Carrot cake powder dragée jelly beans. Sugar plum lollipop cotton candy chupa chups liquorice. Donut tootsie roll bonbon halvah icing chupa"
        },
        {id: 4, title:"Cheese",
          summary: "Ice cream liquorice biscuit candy canes candy biscuit caramels toffee. Wafer toffee gummies gummi bears muffin lollipop cake croissant gingerbread. Macaroon carrot cake croissant wafer sweet pie sweet roll biscuit chocolate bar. Caramels soufflé bonbon carrot cake. Halvah tiramisu wafer. " +
          "Carrot cake powder dragée jelly beans. Sugar plum lollipop cotton candy chupa chups liquorice. Donut tootsie roll bonbon halvah icing chupa"},
        {id: 5, title:"Chips",
          summary: "Ice cream liquorice biscuit candy canes candy biscuit caramels toffee. Wafer toffee gummies gummi bears muffin lollipop cake croissant gingerbread. Macaroon carrot cake croissant wafer sweet pie sweet roll biscuit chocolate bar. Caramels soufflé bonbon carrot cake. Halvah tiramisu wafer. " +
          "Carrot cake powder dragée jelly beans. Sugar plum lollipop cotton candy chupa chups liquorice. Donut tootsie roll bonbon halvah icing chupa"
        },
        {id: 6, title:"Chocolate",
          summary: "Ice cream liquorice biscuit candy canes candy biscuit caramels toffee. Wafer toffee gummies gummi bears muffin lollipop cake croissant gingerbread. Macaroon carrot cake croissant wafer sweet pie sweet roll biscuit chocolate bar. Caramels soufflé bonbon carrot cake. Halvah tiramisu wafer. " +
          "Carrot cake powder dragée jelly beans. Sugar plum lollipop cotton candy chupa chups liquorice. Donut tootsie roll bonbon halvah icing chupa"

        },
      ];

      $scope.pickedFeature = ( pickeddiv ) => {
        $scope.feature.chosen = pickeddiv;
      };
    }
  );






