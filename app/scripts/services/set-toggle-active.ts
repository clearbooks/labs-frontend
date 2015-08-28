module labsFrontendApp
{
    export interface SetToggleActive
    {
        execute( toggleId: number );
    }

    export class HttpSetToggleActive extends HttpService<any> implements SetToggleActive
    {
        protected url = 'toggle/change-status';

        execute( toggleId: number )
        {
            this.post( {toggleId: toggleId, newStatus: true, userId: 1} );
        }
    }
}