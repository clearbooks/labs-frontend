module labsFrontendApp
{
    export interface AppWindow extends Window
    {
        config: {
            jwtServer: string;
            apiHost: string;
            apiBasePath: string;
            accountApiHost: string;
            accountApiEndpoint: string;
        };
    }
}


