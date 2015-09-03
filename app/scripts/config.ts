module labsFrontendApp
{
    export interface Configuration
    {
        getJwtServerUrl(): string;
    }

    export class Jinja2Configuration implements Configuration
    {
        getJwtServerUrl():string {
            return undefined;
        }
    }
}