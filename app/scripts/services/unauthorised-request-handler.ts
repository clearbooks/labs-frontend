module labsFrontendApp
{
    export interface UnauthorisedRequestHandler
    {
        handleUnauthorisedRequest(): void
    }

    // until I figure out my typescript configuration issues
    export class ConsoleUnauthorisedRequestHandler implements UnauthorisedRequestHandler
    {
        handleUnauthorisedRequest():void
        {
            console.log('Consider yourself taken off to the JWT server')
        }
    }
}