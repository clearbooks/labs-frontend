module labsFrontendApp
{
    export interface ToggleAutoSubscribe
    {
        execute();
    }

    export class HttpAutoSubscribe implements ToggleAutoSubscribe
    {
        /**
         * @ngInject
         * @param apiUrl
         * @param simplePoster
         */
        constructor( private apiUrl: string, private simplePoster: SimplePoster ) {}


        public execute()
        {
            this.simplePoster.post( this.apiUrl + 'user/toggle-auto-subscribe', {} );
        }
    }
}