/// <reference path="../services/get-all-public-releases.ts" />

'use strict';

module labsFrontendApp
{
  export interface IDashboardScope
  {
    releases: any;
    feature: any;
    message: any;
    feature_sections: any;
    hideSuccessMessage: any;
    pickedFeature: any;

  }

  export class DashboardCtrl
  {
    // @ngInject
    constructor (private $scope: IDashboardScope, private releases: GetAllPublicReleases) {
      releases.execute().then( ( releases ) => {
        $scope.releases = releases;

      } );


        $scope.feature = {
          chosen: undefined
        };

        $scope.message = {
          success: undefined
        };


        $scope.feature_sections = [

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


        $scope.hideSuccessMessage = ()  =>  {
          $scope.message.success = false;//hide message if user wants to write/submit more feedback
          console.log("from close function " + $scope.message.success);
        }

        $scope.pickedFeature = ( pickedFeature ) => {
          $scope.feature.chosen = pickedFeature;
        };

    }
  }
}


