/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../../app/scripts/services/get-groups-for-user.ts" />

module labsFrontendApp
{
    export class GetGroupsForUserStub implements GetGroupsForUser
    {
        constructor( private $q: ng.IQService )
        {
        }

        /**
         * Execute this Use Case
         * @returns {IPromise<T>}
         */
        execute():ng.IPromise<Array<any>>
        {
            var promise = this.$q.defer();
            promise.resolve( [GetGroupsForUserStub.getStubGroup()] );
            return promise.promise;
        }

        static getStubGroup()
        {
            return {
                id: 1337,
                name: 'Hyper Global Meganet',
                url: 'https://example.com',
                isAdmin: true
            };
        }
    }
}