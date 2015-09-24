/// <reference path="set-user-toggle-active.ts" />
module labsFrontendApp
{
    export class HttpSetGroupToggleActive implements SetToggleActive
    {
        protected url = 'group/toggle/change-status';

        /**
         * @ngInject
         * @param apiUrl
         * @param simplePoster
         */
        constructor( private apiUrl: string, private simplePoster: SimplePoster ) {}

        execute( toggleId: number, active: boolean )
        {
            this.simplePoster.post( this.apiUrl + this.url, {toggleId: toggleId, newStatus: active ? 'active' : 'inactive'} );
        }
    }
}