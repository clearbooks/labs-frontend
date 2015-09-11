module labsFrontendApp
{
    export class GetIsAutoSubscribedStub implements GetIsAutoSubscribed
    {
        constructor( private $q: ng.IQService )
        {
        }

        execute():angular.IPromise<IsAutoSubscribed>
        {
            var d = this.$q.defer();
            d.resolve( this.getStubData() );
            return d.promise;
        }

        public getStubData():IsAutoSubscribed
        {
            return {
                autoSubscribed: false
            }
        }
    }
}