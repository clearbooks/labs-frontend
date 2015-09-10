module labsFrontendApp
{
    export interface SetToggleActive
    {
        execute( toggleId: number, active: boolean );
    }

    export class HttpSetToggleActive extends HttpService<any> implements SetToggleActive
    {
        protected url = 'toggle/change-status';

        execute( toggleId: number, active: boolean )
        {
            this.post( {toggleId: toggleId, newStatus: active ? 'active' : 'inactive', userId: 1} );
        }
    }
}