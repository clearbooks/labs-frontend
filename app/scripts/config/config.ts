module labsFrontendApp
{
    export interface AppWindow extends Window
    {
        config: {
            jwtServer: string;
            accountApiHost: string;
            accountApiEndpoint: string;
        };
    }
}


