module labsFrontendApp
{
    export class GetAllToggleStatusStub implements GetAllToggleStatus
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
                1: { id: 1, active: 0, locked: 0 },
                2: { id: 2, active: 1, locked: 0 },
                3: { id: 3, active: 1, locked: 1 }
            }
        }
    }
}
