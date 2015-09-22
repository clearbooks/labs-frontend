module labsFrontendApp
{
    export interface SetToggleActive
    {
        execute( toggleId: number, active: boolean );
    }

    export class HttpSetToggleActive implements SetToggleActive
    {
        protected url = 'user/toggle/change-status';

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