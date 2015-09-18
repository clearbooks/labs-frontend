module labsFrontendApp
{
    export interface UnauthorisedRequestHandler
    {
        handleUnauthorisedRequest(): void
    }

    export class RedirectUnauthorisedRequestHandler implements UnauthorisedRequestHandler
    {
        /**
         * @ngInject
         * @param jwtUrl
         */
        constructor( private jwtUrl: string )
        {
        }

        handleUnauthorisedRequest():void
        {
            window.location.replace( this.jwtUrl );
        }
    }
}