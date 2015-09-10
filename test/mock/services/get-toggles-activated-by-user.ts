module labsFrontendApp
{
    export class GetTogglesActivatedByUserStub implements GetTogglesActivatedByUser
    {
        constructor( private $q: ng.IQService )
        {
        }

        execute():angular.IPromise<Object>
        {
            var d = this.$q.defer();
            d.resolve( this.getStubData() );
            return d.promise;
        }

        public getStubData():Object
        {
            return {
                cats: 1,
                dogs: 1
            }
        }
    }
}