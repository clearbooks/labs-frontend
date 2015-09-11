module labsFrontendApp
{
    export interface ToggleAutoSubscribe
    {
        execute();
    }

    export class HttpAutoSubscribe extends HttpService<any> implements ToggleAutoSubscribe
    {
        protected url = 'user/toggle-auto-subscribe';

        execute()
        {
            this.post( {} );
        }
    }
}